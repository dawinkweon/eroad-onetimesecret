const crypto = require('crypto');

export default function handler(req, res) {
  console.log(`encrypting secret... secret=[${req.body.secretText}]`);

  const post = (req, res) => {
    if (!req.body.secretText) {
     res.status(400).json({ message: "secretText is missing in body" });
    }

    const mykey = crypto.createCipher('aes-128-cbc', '!fEiDRs@NA6E!V');
    let encryptedText = mykey.update(req.body.secretText, 'utf8', 'hex')
    encryptedText += mykey.final('hex');

    const token = crypto.randomUUID();

    res.status(200).json({ secretUrl: 'http://path.to.secret/?token=' + token + '&encryptedText=' + encryptedText });
  }

  if (req.method === 'POST') {
    post(req, res);
  } else {
    res.status(404);
  }

}