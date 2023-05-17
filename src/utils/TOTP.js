/* eslint-disable no-undef */
import CryptoJS from 'crypto-js';

function TOTP(secret, time, timeInterval) {
    // Calculate the number of 30 second intervals since Unix epoch
    const timeStep = Math.floor(time / timeInterval);
    console.log("timeStep", timeStep);

    // Prepare the text to be hashed
    const hashInput = secret + timeStep.toString();
    console.log("hashInput", hashInput);

    // Calculate SHA256
    const hash = CryptoJS.SHA256(hashInput);
    console.log("hash", hash);

    // Convert the hash to hex
    const digest = hash.toString(CryptoJS.enc.Hex);
    console.log("digest", digest);

    return {
        hashInput,
        digest,
    };
}

export default TOTP;
