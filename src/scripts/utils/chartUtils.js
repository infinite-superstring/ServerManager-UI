function hideDatasets(chart, datasetIndexToShow) {
  /**
   * 隐藏数据集
   * @type {[]|*[]|{}|{bar: ChartTypeRegistry["bar"]["datasetOptions"], line: ChartTypeRegistry["line"]["datasetOptions"], scatter: ChartTypeRegistry["scatter"]["datasetOptions"], bubble: ChartTypeRegistry["bubble"]["datasetOptions"], pie: ChartTypeRegistry["pie"]["datasetOptions"], doughnut: ChartTypeRegistry["doughnut"]["datasetOptions"], polarArea: ChartTypeRegistry["polarArea"]["datasetOptions"], radar: ChartTypeRegistry["radar"]["datasetOptions"]}|ChartTypeRegistry[key]["datasetOptions"]|ChartDataset<TType, TData>[]|ChartDatasetCustomTypesPerDataset<TType, TData>[]|*}
   */
  let datasets = chart.data.datasets;
  for (let i = 0; i < datasets.length; i++) {
    if (i !== datasetIndexToShow) {
      chart.getDatasetMeta(i).hidden = true;
    }
  }
  chart.update();
}

function delOldDataAndLabel(datasets, labels, max) {
  if (labels.length > max) {
    labels.shift()
  }
  for (let i = 0; i < datasets.length; i++) {
    if (datasets[i].data.length > max) {
      datasets[i].data.shift()
    }
  }
  return {
    datasets: datasets,
    labels: labels
  }
}


export default {
  hideDatasets,
  delOldDataAndLabel
}
