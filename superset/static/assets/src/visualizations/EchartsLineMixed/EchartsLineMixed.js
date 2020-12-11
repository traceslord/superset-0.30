import echarts from 'echarts';

import azul from 'echarts/theme/azul';
import carp from 'echarts/theme/carp';
import darkbold from 'echarts/theme/dark-bold';
import eduardo from 'echarts/theme/eduardo';
import gray from 'echarts/theme/gray';
import inspired from 'echarts/theme/inspired';
import macarons2 from 'echarts/theme/macarons2';
import roma from 'echarts/theme/roma';
import techblue from 'echarts/theme/tech-blue';
import beeinspired from 'echarts/theme/bee-inspired';
import darkdigerati from 'echarts/theme/dark-digerati';
import forest from 'echarts/theme/forest';
import green from 'echarts/theme/green';
import jazz from 'echarts/theme/jazz';
import mint from 'echarts/theme/mint';
import royal from 'echarts/theme/royal';
import vintage from 'echarts/theme/vintage';
import blue from 'echarts/theme/blue';
import dark from 'echarts/theme/dark';
import darkfreshcut from 'echarts/theme/dark-fresh-cut';
import freshcut from 'echarts/theme/fresh-cut';
import helianthus from 'echarts/theme/helianthus';
import london from 'echarts/theme/london';
import red from 'echarts/theme/red';
import sakura from 'echarts/theme/sakura';
import caravan from 'echarts/theme/caravan';
import darkblue from 'echarts/theme/dark-blue';
import darkmushroom from 'echarts/theme/dark-mushroom';
import fruit from 'echarts/theme/fruit';
import infographic from 'echarts/theme/infographic';
import macarons from 'echarts/theme/macarons';
import redvelvet from 'echarts/theme/red-velvet';
import shine from 'echarts/theme/shine';

import { formatDate } from '../../utils/dates';

function echartsLineMixedVis(element, props) {
  const legendData = [props.data.y_axis_left].concat(props.data.y_axis_right);
  const series = [
    {
      name: props.data.y_axis_left,
      type: 'line',
      data: props.data.data.map(data => data[props.data.y_axis_left]),
    },
  ].concat(props.data.y_axis_right.map(item => ({
      name: item,
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      itemStyle: {
        normal: {
          lineStyle: {
            type: 'dotted',
          },
        },
      },
      areaStyle: {},
      data: props.data.data.map(data => data[item]),
    })));
  const div = d3.select(element);
  const html = '<div id="main" style="width: ' + props.width + 'px; height: ' + props.height + 'px"></div>';
  div.html(html);
  const myChart = echarts.init(document.getElementById('main'), props.theme);
  myChart.setOption({
    title: {
      text: '',
      left: 20,
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      data: legendData,
      align: 'right',
      right: 60,
      top: 20,
    },
    grid: {
      left: '3%',
      right: '4%',
      top: 80,
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.data.data.map(data => formatDate.formateDay(data[props.data.x_axis])),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
      },
    ],
    series,
  });
}

export default echartsLineMixedVis;
