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

export default {
  hideDatasets
}
