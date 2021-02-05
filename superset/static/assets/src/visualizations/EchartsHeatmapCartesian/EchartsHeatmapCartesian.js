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

import { formatDate } from '../../utils/dates';

function echartsHeatmapCartesianVis(element, props) {
  const rotate = props.data.rotate;
  const xAxisData = props.data.x_axis;
  const yAxisData = props.data.y_axis_left;
  const data = props.data.data.map(item => [
    item[0],
    item[1],
    item[2] || '-',
  ]);
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000);
  const html = `<div
    id="echarts-heatmap-cartesian-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-heatmap-cartesian-${randomNumber}`), props.theme);
  myChart.setOption({
    tooltip: {
      position: 'top',
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: props.data.save_as_image,
        },
      },
    },
    animation: false,
    grid: {
      top: 60,
      bottom: 100,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate,
      },
      splitArea: { show: true },
      data: xAxisData,
    },
    yAxis: {
      type: 'category',
      splitArea: { show: true },
      data: yAxisData.map(item => formatDate.formateDay(item)),
    },
    visualMap: {
      min: 0,
      max: 15,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
    },
    series: [
      {
        name: '贡献',
        type: 'heatmap',
        data,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
}

export default echartsHeatmapCartesianVis;
