export default function handler(req, res) {
  console.log(`encrypting secret... secret=[${req.body.secretText}]`);

  const post = (req, res) => {
    console.log(`Revealing secret for token = [${req.body.token}]`);
    res.status(200).json({ secret: "Some Secret" });
  } 

  if (req.method === 'POST') {
    post(req, res);
  } else {
    res.status(404);
  }


}
