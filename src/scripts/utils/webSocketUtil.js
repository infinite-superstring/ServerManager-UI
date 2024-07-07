let resetCount = 0; // 初始化重连尝试计数器
let isClose = false;
let isReconnecting = false; // 重连状态标志
let wsInstance = null; // 新增: 用于存储WebSocket实例

/**
 * 创建websocket
 * @param url 地址
 * @param {Object} config 配置
 * @param {Function} config.onopen 连接成功回调
 * @param {Function} config.onmessage 接收到消息回调
 * @param {Function} config.onclose 连接关闭回调
 * @param {Function} config.onerror 连接错误回调
 * @param {Boolean} config.autoReconnect 是否自动重连
 * @param {Number} [config.maxReconnectAttempts=5] 最大重连尝试次数
 * @return WebSocket
 */
export const createWebSocket = (url, config) => {
  const maxReconnectAttempts = config.maxReconnectAttempts || 5; // 默认最大重连次数为5次

  wsInstance = new WebSocket(url);

  wsInstance.onopen = () => {
    console.log('套接字连接成功'+wsInstance.readyState);
    resetCount = 0;
    isReconnecting = false;
    config.onopen && config.onopen(wsInstance);
  };
  wsInstance.onmessage = (e) => {
    config.onmessage && config.onmessage(e,wsInstance);
  };
  wsInstance.onclose = () => {
    console.error('套接字连接关闭');
    if (!isClose) {
      handleReconnect();
    }
    config.onclose && config.onclose(wsInstance);
  };
  wsInstance.onerror = () => {
    console.error('套接字连接错误');
    if (!isClose) {
      handleReconnect();
    }
    config.onerror && config.onerror(wsInstance);
  };

  const handleReconnect = () => {
    if (!isReconnecting && config.autoReconnect && resetCount < maxReconnectAttempts && !isClose) {
      isReconnecting = true;
      resetCount++;
      console.warn(`套接字将在3秒后尝试第${resetCount}次重连...`);
      setTimeout(() => {
        if (wsInstance.readyState !== WebSocket.CLOSED) {
          wsInstance.close();
        }
        wsInstance = createWebSocket(url, config);
        isReconnecting = false;
      }, 3000);
    } else if (resetCount >= maxReconnectAttempts) {
      console.error('达到最大重连次数，停止重连');
      isReconnecting = false;
    }
  };

  return wsInstance;
};

/**
 * 关闭WebSocket连接
 */
export const closeWebSocket = () => {
  // 移除所有事件处理函数
  wsInstance.onopen = null;
  wsInstance.onmessage = null;
  wsInstance.onerror = null;
  wsInstance.onclose = null;
  wsInstance.close();
  wsInstance = null;
  isReconnecting = false;
  isClose = true;
};
