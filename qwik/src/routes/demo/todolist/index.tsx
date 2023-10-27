import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  routeAction$,
  zod$,
  z,
  Form,
  server$,
} from "@builder.io/qwik-city";
import styles from "./todolist.module.css";
import { from } from "rxjs";

interface ListItem {
  text: string;
}

export const list: ListItem[] = [];

const dateStream = server$(async function* () {
  while (true) {
    console.log("new date from server!")
    yield new Date();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});

export const useListLoader = routeLoader$(() => {
  return list;
});

export const useAddToListAction = routeAction$(
  (item) => {
    list.push(item);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string().trim().min(1),
  }),
);

export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();
  const currentDate = useSignal<Date>();

  useVisibleTask$(async () => {
      const x = await dateStream.call(this);
      from(x).subscribe(date => currentDate.value = date)
  });

  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">TODO</span> List
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        {list.value.length === 0 ? (
          <span class={styles.empty}>No items found</span>
        ) : (
          <ul class={styles.list}>
            {list.value.map((item, index) => (
              <li key={`items-${index}`}>{item.text}</li>
            ))}
          </ul>
        )}
      </div>

      <div><p>{ currentDate.value?.toISOString() }</p></div>

      <div class="container container-center">
        <Form action={action} spaReset>
          <input type="text" name="text" required class={styles.input} /><whitespace />
          <button type="submit" class="button-dark">
            Add item
          </button>
        </Form>

        <p class={styles.hint}>
          PS: This little app works even when JavaScript is disabled.
        </p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo List",
};
