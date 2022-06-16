import { createCipher, randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { storeSecret } from "../repository/secretRepository";

const post = (request: CreateSecretRequest, res: NextApiResponse) => {

  if (typeof request.secretText === "undefined") {
   res.status(400).json({ message: "secretText is missing in body" });
  }

  const mykey = createCipher('aes-128-cbc', '!fEiDRs@NA6E!V');
  let encryptedText = mykey.update(request.secretText, 'utf8', 'hex')
  encryptedText += mykey.final('hex');

  const uuid = randomUUID();
  const token = randomUUID();

  const secret : Secret = {
    id: uuid,
    encryptedText: encryptedText,
    token: token,
    createdDate: "2022-06-16T03:09:58+0000",
    timeToLiveDuration: "P3DT4H59M"
  }
  storeSecret(secret);

  const response : CreateSecretResponse = { 
    secretUrl: 'http://path.to.secret/showSecret/' + uuid + "/?token=" + token
  };
  res.status(200).json(response);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const request = req.body as CreateSecretRequest;

  console.log(`encrypting secret... secret=[${request.secretText}]`);

  if (req.method === 'POST') {
    post(request, res);
  } else {
    res.status(404);
  }
}