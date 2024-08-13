import axios from "@/scripts/utils/axios";

function load_operation_log(page, page_size, params) {
  return axios.post("/api/admin/auditAndLogger/audit", {
    page: page,
    pageSize: page_size,
    ...params
  })
}

export default {load_operation_log}
