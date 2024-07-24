import CryptoJS from 'crypto-js';

self.onmessage = (e) => {
    const { chunk, chunkIndex } = e.data;
    const reader = new FileReader();

    reader.onload = () => {
        const wordArray = CryptoJS.lib.WordArray.create(reader.result);
        const hash = CryptoJS.SHA256(wordArray).toString();
        self.postMessage({ hash, chunkIndex });
    };

    reader.readAsArrayBuffer(chunk);
};
