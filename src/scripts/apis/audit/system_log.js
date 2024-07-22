import axios from "@/scripts/utils/axios";

function load_system_log(page, page_size) {
  return axios.post("/api/admin/auditAndLogger/systemLog", {
    page: page,
    pageSize: page_size,
  })
}

export default {load_system_log}
