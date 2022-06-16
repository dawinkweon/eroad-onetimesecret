import { createDecipher } from "crypto";
import { NextApiRequest, NextApiResponse } from "next/types";
import { findSecretById } from "../repository/secretRepository";

const post = (request: RevealSecretRequest, res: NextApiResponse) => {
  console.log(`Revealing secret for token = [${request.token}]`);

  if (!request.token) {
    res.status(400).json({ message: "token is missing in body" });
  }

  if (!request.id) {
    res.status(400).json({ message: "id is missing in body" });
  }

  const secret = findSecretById(request.id);
  console.log(`Secret found for ${request.id} was [${secret}]`);
  if (typeof secret === "undefined") {
    const response = { "msg": "Secret not found"}
    res.status(200).json(response);
  }

  if (secret.token !== request.token) {
    const response = { "msg": "Token is wrong"}
    res.status(200).json(response);
  }

  const mykey = createDecipher("aes-128-cbc", "!fEiDRs@NA6E!V");
  let decryptedText = mykey.update(secret.encryptedText, "hex", "utf8");
  decryptedText += mykey.final("utf8");

  const response: RevealSecretResponse = {
    secret: decryptedText
  };
  res.status(200).json(response);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const request = req.body as RevealSecretRequest;
  console.log(`encrypting secret... secret=[${req.body.secretText}]`);

  if (req.method === "POST") {
    post(request, res);
  } else {
    res.status(404);
  }
}
