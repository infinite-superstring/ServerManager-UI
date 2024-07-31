import SparkMD5 from "spark-md5";
import CryptoJS from 'crypto-js';

async function calculateMD5(dataUrl) {
  // 从 base64 数据中提取文件内容
  const base64Content = dataUrl.split(',')[1];

  // 计算MD5哈希值
  const spark = new SparkMD5.ArrayBuffer();
  const buffer = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0)).buffer;
  spark.append(buffer);
  return spark.end()
}

// 创建分块
const create_chunks = (file, chunk_size) => {
  const numChunks = Math.ceil(file.size / chunk_size)
  return Array.from({length: numChunks}, (_, i) => file.slice(i * chunk_size, (i + 1) * chunk_size))
}

const calculateChunkHash = async (task) => {
  /**
   * 计算文件块哈希值
   */
  const {chunk, index} = task
  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => resolve({
      hash: CryptoJS.SHA256(CryptoJS.lib.WordArray.create(fileReader.result)).toString(CryptoJS.enc.Hex),
      index: index
    })
    fileReader.onerror = () => reject(fileReader.error)
    fileReader.readAsArrayBuffer(chunk)
  })
}

const calculateFileHashes = async (task) => {
  /**
   * 读取文件并计算哈希值
   * @type {FileReader}
   */

  const {index, file, chunk_size} = task

  const chunks = Math.ceil(file.size / chunk_size)
  const chunkHashes = []

  for (let i = 0; i < chunks; i++) {
    const start = i * chunk_size
    const end = Math.min(start + chunk_size, file.size)
    const chunk = file.slice(start, end)

    chunkHashes.push(await calculateChunkHash(chunk))
  }

  // 计算整个文件的哈希值
  const fileHash = CryptoJS.SHA256(chunkHashes.join('')).toString(CryptoJS.enc.Hex)

  console.log(fileHash, chunkHashes)

  return {
    index,
    fileHash,
    chunkHashes
  }
}

export default {calculateMD5, calculateFileHashes, calculateChunkHash, create_chunks};
