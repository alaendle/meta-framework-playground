import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
    console.log("Hello API called.");
    return ({ title: 'Hello World' });
});
