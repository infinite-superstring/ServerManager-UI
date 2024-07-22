import axios from "@/scripts/utils/axios";

function load_access_log(page, page_size) {
  return axios.post("/api/admin/auditAndLogger/accessLog", {
    page: page,
    pageSize: page_size,
  })
}

export default {load_access_log}
