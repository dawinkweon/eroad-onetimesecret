import { createDecipher } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { findSecretById } from "../repository/secretRepository";
import { RevealSecretRequest } from "./revealSecretRequest";
import { RevealSecretResponse } from "./revealSecretResponse";

const post = async(request: RevealSecretRequest, res: NextApiResponse) => {
  console.log(`Revealing secret for token = [${request.token}]`);

  if (!request.token) {
    res.status(400).json({ message: "token is missing in body" });
  }

  if (!request.id) {
    res.status(400).json({ message: "id is missing in body" });
  }

  const secret = await findSecretById(request.id);
  console.log(`Secret found for ${request.id} was [${JSON.stringify(secret)}]`);
  if (typeof secret === "undefined") {
    // TODO send error, secret does not exist
  }

  // TODO check token matching

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
