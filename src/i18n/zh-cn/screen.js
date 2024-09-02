export default {
  title: "{title} 运维监控",
  not_update_time: "等待响应",
  back_btn: "返回首页",
  load_status: {
    loading: "加载中...",
    await_data: "数据载入中...",
    disconnection: "失去连接"
  },
  base_info: {
    total_count: "节点总数",
    online_count: "在线节点",
    offline_count: "离线节点",
    warning_count: "告警节点",
    running_tasks_count: "执行任务数",
    user_count: "平台用户数"
  },
  chart: {
    nodes_status: {
      title: "节点状态"
    },
    cpu_usage: {
      title: "CPU使用率(Top10)",
    },
    memory_usage: {
      title: "内存使用率(Top10)",
    },
    load_avg: {
      title: "一分钟平均负载(Top10)"
    },
    alarm_trend: {
      title: "告警趋势"
    },
    network_throughput: {
      title: "网络吞吐量(Top3)"
    },
    disk_usage: {
      title: "磁盘空间(Top5)"
    }
  }
}
