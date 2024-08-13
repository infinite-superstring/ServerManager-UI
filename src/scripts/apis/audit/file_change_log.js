import axios from "@/scripts/utils/axios";

function load_file_change_log(page, page_size, params) {
  return axios.post("/api/admin/auditAndLogger/fileChangeLog", {
    page: page,
    pageSize: page_size,
    ...params
  })
}

export default {load_file_change_log}
