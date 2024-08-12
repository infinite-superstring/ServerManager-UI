// Composables
import {createRouter, createWebHistory} from 'vue-router'
import login from "@/views/Login.vue";
import initUser from "@/views/initUser.vue";
import UserInfo from "@/views/UserInfo.vue";
import Dashboard from "@/views/Dashboard.vue"
import nodeList from "@/views/node/NodeList.vue";
import NodeControl from "@/views/node/NodeControl.vue";
import userManagementPage from "@/views/admin/User.vue"
import permissionManagementPage from "@/views/admin/Permission.vue"
import auditAndLoggerPage from "@/views/admin/Audit.vue"
import configPage from "@/views/admin/Config.vue"
import aboutPage from "@/views/About.vue"
import errorPage from "@/views/Error.vue"
import appbar_default from "@/components/header/AppBar_Btn/default.vue"
import {useUserStore} from "@/store/userInfo";
import vue from "@/main"
import Message from '@/views/Messages.vue'
import nodeGroupEdit from "@/views/node/NodeGroupEdit.vue";
import ClusterTask from "@/views/node/ClusterTask.vue";
import ClusterExecution from "@/views/node/ClusterRun.vue";
import PatrolPage from '@/views/Patrol.vue'
import DutyPage from '@/views/Duty.vue'
import WebStatus from "@/views/web_status/WebStatus.vue";
import {useWebsiteSettingStore} from "@/store/webSiteSetting";
import dialogs from "@/scripts/utils/dialogs";
import clusterFileSend from "@/views/node/clusterFileSend.vue";
// import dialogs from "@/scripts/utils/dialogs";
const routes = [
  // 登录
  {
    path: '/login',
    name: "login",
    component: login,
    meta: {
      title: "请登录",
      pass_login: true
    }
  },
  {
    path: '/init_user',
    name: "init_user",
    components: {
      default: initUser,
      appBarBtn: appbar_default
    },
    meta: {
      title: "初始化用户",
      pass_bind_otp: true
    }
  },
  // 仪表板
  {
    path: '/',
    name: "dashboard",
    components: {
      default: Dashboard,
      appBarBtn: appbar_default
    },
    meta: {
      title: "仪表盘"
    }
  },
  // 节点列表
  {
    path: '/node_manager/nodeList',
    name: "nodeList",
    components: {
      default: nodeList,
      appBarBtn: appbar_default
    },
    meta: {
      title: "节点列表"
    }
  },
  // 节点控制
  {
    path: '/node_manager/node',
    name: "nodeControl",
    components: {
      default: NodeControl,
      appBarBtn: appbar_default
    },
    meta: {
      title: "节点控制"
    }
  },
  {
    path: '/node_manager/groupEdit',
    name: "nodeGroupEdit",
    components: {
      default: nodeGroupEdit,
      appBarBtn: appbar_default
    },
    meta: {
      title: "群组编辑"
    }
  },
  {
    path: '/node_manager/cluster/Task',
    name: "clusterTask",
    components: {
      default: ClusterTask,
      appBarBtn: appbar_default
    },
    meta: {
      title: "集群任务"
    }
  },
  {
    path: '/node_manager/cluster/Execution',
    name: "clusterExecution",
    components: {
      default: ClusterExecution,
      appBarBtn: appbar_default
    },
    meta: {
      title: "集群命令"
    }
  },
  {
    path: '/node_manager/cluster/FileSend',
    name: "clusterFileSend",
    components: {
      default: clusterFileSend,
      appBarBtn: appbar_default
    },
    meta: {
      title: "集群文件分发"
    }
  },
  // 网站可用性监控
  {
    path: '/web_status',
    name: "webStatus",
    components: {
      default: WebStatus,
      appBarBtn: appbar_default
    },
    meta: {
      title: "网站可用性监控",
      permission: "viewWebStatus",
    }
  },
  // 个人信息设置
  {
    path: '/userInfo',
    name: "userInfo",
    components: {
      default: UserInfo,
      appBarBtn: appbar_default
    },
    meta: {
      title: "个人信息"
    }
  },
  {
    // 消息中心
    path: "/message",
    name: "message",
    components: {
      default: Message,
      appBarBtn: appbar_default
    },
    meta: {
      title: "站内信"
    }
  },
  // 管理 - 用户管理
  {
    path: "/admin/users",
    name: "userManagement",
    components: {
      default: userManagementPage,
      appBarBtn: appbar_default
    },
    meta: {
      title: "用户管理",
      permission: "manageUser"
    }
  },
  // 管理 - 权限管理
  {
    path: "/admin/permission",
    name: "permissionManagement",
    components: {
      default: permissionManagementPage,
      appBarBtn: appbar_default
    },
    meta: {
      title: "权限管理",
      permission: "managePermissionGroup"
    }
  },
  // 管理 - 审计与日志
  {
    path: "/admin/audit",
    name: "audit",
    components: {
      default: auditAndLoggerPage,
      appBarBtn: appbar_default
    },
    meta: {
      title: "审计与日志",
      permission: ["viewAudit", 'clusterTask', 'viewWebStatus']
    }
  },
  // 管理 - 设置
  {
    path: "/admin/settings",
    name: "settings",
    components: {
      default: configPage,
      appBarBtn: appbar_default
    },
    meta: {
      title: "设置",
      permission: "changeSettings",
      pass_bind_otp: true
    }
  },
  // 值班
  {
    path: '/duty/',
    name: "duty",
    components: {
      default: DutyPage,
      appBarBtn: appbar_default
    },
    meta: {
      title: "值班记录",
      permission: "viewDuty"
    }
  },
  // 巡检
  {
    path: '/patrol/',
    name: "patrol",
    components: {
      default: PatrolPage,
      appBarBtn: appbar_default
    },
    meta: {
      title: "巡检记录",
      permission: "viewPatrol"
    }
  },
  // 关于
  {
    path: "/about/",
    name: "about",
    component: aboutPage,
    appBarBtn: appbar_default,
    meta: {
      title: "关于",
      pass_bind_otp: true
    }
  },
  // 错误
  {
    path: '/error/:errorCode',
    component: errorPage,
    meta: {
      title: "Error!",
      pass_login: true,
      pass_bind_otp: true
    }
  },
  {path: '/:pathMatch(.*)*', redirect: '/error/404'} // 重定向到404页
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const default_title = vue.config.globalProperties.$default_title
  document.title = to.meta.title ? default_title + " —— " + to.meta.title : default_title
  next();
});

let userStore
router.beforeEach(async (to, from, next) => {
  userStore = useUserStore()
  if (to.meta.pass_login) {
    await next()
  } else {
    if (sessionStorage.getItem('loginStatus') === "true" && userStore.userName) {
      await next()
    }
    if (await userStore.login_status()) {
      await next()
    } else {
      await next("/login")
    }
  }
});

// 初始化服务端配置文件
let websiteSettingStore
router.beforeEach(async (to, from, next) => {
  // 绕过不需要登录的界面
  if (to.meta.pass_login) {return await next()}
  websiteSettingStore = useWebsiteSettingStore()
  if (!websiteSettingStore.serverConfig.init) await websiteSettingStore.updateServerConfig()
  await next()
})

// 返回403页
router.beforeEach((to, from, next) => {
  if (to.meta.permission && !userStore.check_user_permission(to.meta.permission)) { // 检查路由是否需要特殊权限
    next("/error/403")
  } else {
    next()
  }
});

// 新用户强制跳转初始化页面
router.beforeEach((to, from, next) => {
  if (to.meta.pass_login) {return next()}
  if (userStore.isNewUser && to.name !== 'init_user') {return next("/init_user")}
  return next()
})

// 检查OTP绑定
router.beforeEach(async (to, from, next) => {
  // 绕过不需要登录的界面
  if (to.meta.pass_login) {return await next()}
  if (to.meta.pass_bind_otp) {return await next()}
  await next()
  // 如果强制绑定OTP+用户未绑定OTP将弹出绑定框
  if (websiteSettingStore.serverConfig.forceOTP_Bind && !userStore.enableOTP) {
    await dialogs.showBindOTP_Dialog()
  }
})

export default router
