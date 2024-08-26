export default {
  title: '仪表盘',
  overview: {
    title: '总览',
    total: '节点总数',
    online: '在线中',
    offline: '离线中',
    warning: '告警中'
  },
  node_list: {
    title: '节点列表',
    more: '更多...',
    more__title: '点击进入节点列表页',
    table: {
      name: '节点名',
      ip: '日志IP',
      ip_is_empty: '未认证',
      status: '在线状态',
      status__title: '点击筛选相同状态节点',
      status__value: {
        online: '在线',
        offline: '离线',
        uninitialized: '未初始化'
      },
      warning: '告警状态',
      warning__value: {
        none: '无',
        normal: '正常',
        warning: '告警中'
      }
    }
  },
  statistics: {
    title: '统计信息',
    api_speed: '平台接口请求量',
    warn_trend: '告警趋势'
  },
  user_info: {
    title: '个人信息',
    avatar: '头像',
    user_name: '用户名',
    group: '所在权限组'
  }
}
