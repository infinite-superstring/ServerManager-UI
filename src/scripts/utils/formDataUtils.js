function new_form_data(data) {
  /**
   * 新建FormData
   */
  const form_data = new FormData();
  for (const key in data) {
    form_data.append(key, data[key])
  }
  return form_data;
}

export default {new_form_data}
