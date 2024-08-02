import axios from "@/scripts/utils/axios";

function search_tag(tag_name) {
  /**
   * 搜索Tag
   */
  return axios.post("/api/node_manager/node_tag/search_tag", {tag: tag_name})
}

export default {search_tag}
