import axios from "@/scripts/utils/axios";

function load_operation_log(page, page_size) {
  return axios.post("/api/admin/auditAndLogger/audit", {
    page: page,
    pageSize: page_size,
  })
}

export default {load_operation_log}
