export const handler = (req: any, res: any) => {
    const func = req.params[0];
    let r = { title: 'wrong endpoint' };
  
    if (func === 'me') {
      r = me();
    } else if (func === 'you') {
      r = you();
    }
    res.status(200).json(r);
  };
  
  const me = () => {
    console.log("me API called!");
    return ({ title: 'Hello World!' });
  };
  
  const you = () => {
    console.log("you API called!");
    return ({ title: 'Hello World?' });
  };
  