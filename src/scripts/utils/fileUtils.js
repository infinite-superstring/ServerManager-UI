import SparkMD5 from "spark-md5";

async function calculateMD5(dataUrl) {
  // 从 base64 数据中提取文件内容
  const base64Content = dataUrl.split(',')[1];

  // 计算MD5哈希值
  const spark = new SparkMD5.ArrayBuffer();
  const buffer = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0)).buffer;
  spark.append(buffer);
  return spark.end()
}

export default {calculateMD5};
