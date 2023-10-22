export const handler = (req: any, res: any) => {
    const func = req.params[0];
    let r = 'wrong endpoint';
  
    if (func === 'me') {
      r = me();
    } else if (func === 'you') {
      r = you();
    }
    res.status(200).json({ r });
  };
  
  const me = () => {
    console.log("me API called!");
    return 'some data from "me" endpoint';
  };
  
  const you = () => {
    console.log("you API called!");
    return 'some data from "you" endpoint';
  };
  