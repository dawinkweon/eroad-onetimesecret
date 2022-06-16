export default function handler(req, res) {
  console.log(`encrypting secret... secret=[${req.body.secretText}]`);

  if (req.method === 'POST') {
    post(req, res);
  } else {
    res.status(404);
  }

  const post = (req, res) => {
    if (!"secretText" in req.body) {
     res.status(400).json({ message: "secretText is missing in body" });
    }

    res.status(200).json({ secretUrl: 'http://path.to.secret/?token=abc' });
  }
}
