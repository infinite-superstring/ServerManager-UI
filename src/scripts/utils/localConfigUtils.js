function load_userinfo() {
  const UserInfo = localStorage.getItem("UserInfo")
  return JSON.parse(UserInfo)
}

function load_web_config() {
  const web_config = localStorage.getItem("WebsiteSetting")
  return JSON.parse(web_config)
}

export default {
  load_userinfo,
  load_web_config,
}
