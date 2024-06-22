import forge from "node-forge";
import fs from "fs";

export const generateKeyPair = async () => {

  //USE RSA FROM FORGE LIBRARY
  const rsa = forge.pki.rsa;

  //GENERATE KEY PAIR USING THE RSA ALGORITHM AND SPECIFYING THE SIZE AND EXPONENT
  const keypair = await rsa.generateKeyPair({ bits: 2048, e: 0x10001 });

  //CONVERT TO PEM FORMAT
  const publicKeyPem = await forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKeyPem = await forge.pki.privateKeyToPem(keypair.privateKey);

  //CONVERT TO STRING AND WRITE ON FILE
  const data = privateKeyPem.toString();
  fs.writeFileSync("./Public/key.txt", data, "utf8");
};
