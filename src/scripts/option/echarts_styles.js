function getNodeStatusEChartsConfig() {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {  //坐标轴指示器，坐标轴触发有效，
        type: 'shadow', //默认为line，line直线，cross十字准星，shadow阴影
        crossStyle: {
          color: '#6d6d6d'
        }
      }
    },
    // legend: {},
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      max: 100,
      min: 0
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 30
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: []
  };
}

export default {
  getNodeStatusEChartsConfig
}
