import {useUserStore} from "@/store/userInfo";

export function check_user_permission(permission) {
  /**
   * 检查用户是否拥有该权限
   * @param permission 权限名
   * @return boolean
   */
  if (!useUserStore().permissions || useUserStore().permissions.length <= 0) {
    return false
  }
  if (useUserStore().permissions.includes("all")) {
    return true
  }

  if (Array.isArray(permission)) {
    for (let i = 0; i < permission.length; i++) {
      if (useUserStore().permissions.includes(permission[i])) {
        return true
      }
    }
    return false
  } else {
    return useUserStore().permissions.includes(permission)
  }
}

export default {
  check_user_permission
}
