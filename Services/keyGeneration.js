import crypto from 'crypto';


export const generateKeyPair= async ()=>{
    const {publicKey,privateKey}=crypto.generateKeyPairSync('rsa',{
        modulusLength:2048,
        publicKeyEncoding:{
            type:'pkcs1',
            format:'pem'
        },
        privateKeyEncoding:{
            type:'pkcs1',
            format:'pem'
        }
    });

    console.log(publicKey,privateKey)
}

