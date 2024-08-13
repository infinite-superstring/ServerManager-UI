import axios from "@/scripts/utils/axios";

function load_system_log(page, page_size, params) {
  return axios.post("/api/admin/auditAndLogger/systemLog", {
    page: page,
    pageSize: page_size,
    ...params
  })
}

export default {load_system_log}
