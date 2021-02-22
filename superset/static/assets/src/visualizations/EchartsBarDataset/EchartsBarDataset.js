import d3 from 'd3';
import echarts from 'echarts';

import 'echarts/theme/azul';
import 'echarts/theme/bee-inspired';
import 'echarts/theme/blue';
import 'echarts/theme/caravan';
import 'echarts/theme/carp';
import 'echarts/theme/cool';
import 'echarts/theme/dark';
import 'echarts/theme/dark-blue';
import 'echarts/theme/dark-bold';
import 'echarts/theme/dark-digerati';
import 'echarts/theme/dark-fresh-cut';
import 'echarts/theme/dark-mushroom';
import 'echarts/theme/eduardo';
import 'echarts/theme/fresh-cut';
import 'echarts/theme/fruit';
import 'echarts/theme/forest';
import 'echarts/theme/gray';
import 'echarts/theme/green';
import 'echarts/theme/helianthus';
import 'echarts/theme/infographic';
import 'echarts/theme/inspired';
import 'echarts/theme/jazz';
import 'echarts/theme/london';
import 'echarts/theme/macarons';
import 'echarts/theme/macarons2';
import 'echarts/theme/mint';
import 'echarts/theme/red';
import 'echarts/theme/red-velvet';
import 'echarts/theme/roma';
import 'echarts/theme/royal';
import 'echarts/theme/sakura';
import 'echarts/theme/shine';
import 'echarts/theme/tech-blue';
import 'echarts/theme/vintage';

function echartsBarDatasetVis(element, props) {
  const indicatorName = props.data.echarts_indicators.map((item) => {
    let name = item;
    if (name === 'estimated_value') name = '预估';
    else if (name === 'completed_value') name = '实际';
    return name;
  });
  const indicatorValue = props.data.data.map(item => ([
    item[props.data.echarts_name],
  ].concat(props.data.echarts_indicators.map(data => (item[data])))));
  const source = [['故事线'].concat(indicatorName)].concat(indicatorValue);
  const series = props.data.echarts_indicators.map(() => ({
    type: 'bar',
    barWidth: props.data.bar_width,
  }));
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 10000000000000000);
  const html = `<div
    id="echarts-bar-dataset-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-bar-dataset-${randomNumber}`), props.theme);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    toolbox: {
      feature: {
        dataView: {
          show: props.data.data_view,
        },
        saveAsImage: {
          show: props.data.save_as_image,
        },
      },
    },
    legend: { top: 10 },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    dataset: { source },
    xAxis: {
      type: 'category',
      name: props.data.x_axis_label,
      axisLabel: {
        interval: 0,
        rotate: props.data.rotate,
      },
    },
    yAxis: { name: props.data.y_axis_label },
    series,
  });
}

export default echartsBarDatasetVis;
