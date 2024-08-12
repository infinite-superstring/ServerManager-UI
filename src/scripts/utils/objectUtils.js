function object_select_value_to_list(obj, key) {
  let temp = []
  for (let i = 0; i < obj.length; i++) {
    temp.push(obj[i][key])
  }
  return temp
}

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype === Object.prototype;
}


export default {
  object_select_value_to_list,
  isPlainObject
}
