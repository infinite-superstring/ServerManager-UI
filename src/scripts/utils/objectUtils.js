function object_select_value_to_list(obj, key) {
  let temp = []
  for (let i = 0; i < obj.length; i++) {
    temp.push(obj[i][key])
  }
  return temp
}

export default {
  object_select_value_to_list
}
