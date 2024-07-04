import QRCode from 'qrcode'

function showQR_Code(dom, url) {
  /**
   * 显示QR_Code
   * @param dom Dom元素，QR Code将渲染在该元素上
   * @param url QR Code要包含的URL
   */
  QRCode.toCanvas(dom, url, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
}

export default {
  showQR_Code
}
