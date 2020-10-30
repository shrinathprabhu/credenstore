import { encrypt, decrypt } from 'triplesec';

export function hideCreds(credentials, masterKey) {
    return new Promise((resolve, reject) => {
        try {
            let key = Buffer.from(masterKey);
            let pt0 = Buffer.from(credentials);
            let pt1 = Buffer.from(pt0);
            encrypt({ key, data: pt1 }, (err, encryptedData) => {
                if (err) return reject(err);
                return resolve(encryptedData.toString('hex'));
            });
        } catch (e) {
            reject(e);
        }
    });
}

export function revealCreds(encryptedData, masterKey) {
    return new Promise((resolve, reject) => {
        let key = Buffer.from(masterKey);
        let pt0 = Buffer.from(encryptedData, 'hex');
        decrypt({ key, data: pt0 }, (err, credentials) => {
            if (err) return reject(err);
            return resolve(credentials.toString());
        });
    });
}