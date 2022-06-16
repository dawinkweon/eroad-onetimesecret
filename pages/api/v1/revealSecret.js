const crypto = require('crypto');

export default function handler(req, res) {

  const post = (req, res) => {
    console.log(`Revealing secret for token = [${req.body.token}]`);

    if (!req.body.token) {
     res.status(400).json({ message: "token is missing in body" });
    }

    const mykey = crypto.createDecipher('aes-128-cbc', '!fEiDRs@NA6E!V');
    let mystr = mykey.update(req.body.token, 'hex', 'utf8')
    mystr += mykey.final('utf8');

    res.status(200).json({ secret: mystr });
  } 

  if (req.method === 'POST') {
    post(req, res);
  } else {
    res.status(404);
  }

}
