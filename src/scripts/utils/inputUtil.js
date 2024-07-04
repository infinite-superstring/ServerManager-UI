const integer = (event) => {
  // 获取用户输入的值
  const inputValue = event.target.value;

  // 如果输入为空，不进行处理，允许留空表示无限
  if (inputValue === '') return;

  // 尝试将输入转换为整数，如果失败则说明输入非整数
  const parsedInt = parseInt(inputValue, 10);
  if (isNaN(parsedInt)) {
    // 如果转换结果为NaN，则清空输入框，表示输入无效
    event.target.value = '';
  } else {
    // 如果是有效的整数，则更新输入框的值，确保其为整数（尽管type="number"已经限制了大部分情况）
    event.target.value = parsedInt;
  }
}

export default {
  integer
}
