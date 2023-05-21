import CryptoJS from 'crypto-js';

function TOTP(secret, time, timeInterval) {

    const timeStep = Math.floor(time / timeInterval);

    const hashInput = secret + timeStep.toString();

    const hash = CryptoJS.SHA256(hashInput);

    const digest = hash.toString(CryptoJS.enc.Hex);

    return {
        hashInput,
        digest,
    };
}

export default TOTP;
