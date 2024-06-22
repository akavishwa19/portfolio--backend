import crypto from "crypto";
import forge from "node-forge";
import fs from 'fs';
import path from 'path';
import express from 'express';


export const generateKeyPair = async () => {
  // const {publicKey,privateKey}=crypto.generateKeyPairSync('rsa',{
  //     modulusLength:2048,
  //     publicKeyEncoding:{
  //         type:'pkcs1',
  //         format:'pem'
  //     },
  //     privateKeyEncoding:{
  //         type:'pkcs1',
  //         format:'pem'
  //     }
  // });

  // console.log(publicKey,privateKey);
  const rsa = forge.pki.rsa;
  const keypair = await rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const publicKeyPem =await forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKeyPem =await forge.pki.privateKeyToPem(keypair.privateKey);

  console.log("Public Key:", privateKeyPem);
  console.log('hahaha')

  const data=privateKeyPem.toString();
  console.log(data,typeof data)
//   console.log("Private Key:", privateKeyPem);

fs.writeFileSync('./Public/key.txt', data, 'utf8');

};
