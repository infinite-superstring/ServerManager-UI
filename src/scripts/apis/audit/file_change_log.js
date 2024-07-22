import axios from "@/scripts/utils/axios";

function load_file_change_log(page, page_size) {
  return axios.post("/api/admin/auditAndLogger/fileChangeLog", {
    page: page,
    pageSize: page_size,
  })
}

export default {load_file_change_log}
