import cron from 'node-cron';
import { generateKeyPair } from './keyGeneration.js';

export const cronTask=async ()=>{
    generateKeyPair();

    cron.schedule('0 0 * * 0',()=>{
        generateKeyPair();
    })
}
