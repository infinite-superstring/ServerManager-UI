import format from "@/scripts/utils/format";

function calculate_percentage(current_value, maximum_value, index = 1){
  return format.formatPercentage((current_value / maximum_value) * 100, index)
}

export default {calculate_percentage};
