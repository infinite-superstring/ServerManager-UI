// Composables
import { createRouter, createWebHistory } from 'vue-router'
import login from "@/views/Login.vue";
import UserInfo from "@/views/UserInfo.vue";
import Dashboard from "@/views/Dashboard.vue"
import nodeList from "@/views/Node/NodeList.vue";
import NodeControl from "@/views/Node/NodeControl.vue";
import userManagementPage from "@/views/admin/User.vue"
import permissionManagementPage from "@/views/admin/Permission.vue"
import auditAndLoggerPage from "@/views/admin/Audit.vue"
import configPage from "@/views/admin/Config.vue"
import aboutPage from "@/views/About.vue"
import errorPage from "@/views/Error.vue"
import appbar_default from "@/components/header/AppBar_Btn/default.vue"
import {useUserStore} from "@/store/userInfo";
import Messages from "@/views/Messages.vue";


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
  // 网站可用性监控
  // {
  //
  // },
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
    // 站内信
  {
    path: '/message',
    name: "message",
    components: {
      default: Messages,
      appBarBtn: appbar_default
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
      permission: "viewAudit"
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
      permission: "changeSettings"
    }
  },
  // 关于
  {
    path: "/about/",
    name: "about",
    component:aboutPage,
    appBarBtn: appbar_default,
    meta: {
      title: "关于"
    }
  },
  // 错误
  {
    path: '/error/:errorCode',
    component: errorPage,
    meta: {
      title: "Error!",
      pass_login: true
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/error/404' } // 重定向到404页
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const default_title = "LoongArch-ServerManager"
  document.title = to.meta.title ? default_title + " —— " + to.meta.title : default_title
  next();
});

let userStore
router.beforeEach((to, from, next) => {
  userStore = useUserStore()
  const loginStatus = userStore.login_status()
  console.log(loginStatus)
  if (to.meta.pass_login) {
      next()
  } else {
    if (loginStatus === true) {
      next()
    }
    if (loginStatus instanceof Promise) {
      console.log("Promise")
      loginStatus.then(res => {
        res ? next() : next("/login")
      }).catch(() => next("/login"))
    }
    next("/login")
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.permission && !userStore.check_user_permission(to.meta.permission)) { // 检查路由是否需要特殊权限
      next("/error/403")
  } else {
    next()
  }
});

export default router
