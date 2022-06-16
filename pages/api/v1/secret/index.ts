import { createCipher, randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { storeSecret } from "../repository/secretRepository";
import fetch from 'node-fetch';

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

  const secretUrl = `${process.env.HOST_URL}/showSecret/${uuid}/?token=${token}`;

  const response : CreateSecretResponse = { 
    secretUrl
  };

  if(!request.recipient) {
    res.status(200).json(response);
  }

  async function triggerEmail() {
  try {
    // 👇️ const response: Response
    const response = await fetch('https://48nu3eol5m.execute-api.ap-southeast-2.amazonaws.com/Prod/secret/', {
      method: 'POST',
      body: JSON.stringify({
        "secret-url": secretUrl,
        "recipient": request.recipient,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    // 👇️ const result: CreateUserResponse
    const result = (await response.json()) as CreateUserResponse;

    console.log('result is: ', JSON.stringify(result, null, 4));
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

  triggerEmail();
  const msg = {"message": "Email sent"}
  res.status(200).json(msg);

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
