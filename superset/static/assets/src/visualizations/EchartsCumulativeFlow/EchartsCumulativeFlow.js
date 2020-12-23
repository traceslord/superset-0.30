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

function formatIndicatorName(name) {
  switch (name) {
    case 'todo_count':
      return '待办';
    case 'assess_count':
      return '安全评审';
    case 'design_count':
      return '设计';
    case 'dev_count':
      return '开发';
    case 'review_count':
      return '安全审查';
    case 'test_count':
      return '系统测试中';
    case 'pass_count':
      return '系统测试通过';
    case 'done_count':
      return '完成';
    default:
      return name;
  }
}

function echartsCumulativeFlowVis(element, props) {
  const series = props.data.echarts_indicators.map(item => ({
    name: formatIndicatorName(item),
    type: 'line',
    stack: '总量',
    areaStyle: {},
    data: props.data.data.map(data => data[item]),
  })).reverse();
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000);
  const html = `<div
    id="echarts-cumulative-flow-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-cumulative-flow-${randomNumber}`), props.theme);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          title: {
            zoom: '缩放',
            back: '还原',
          },
          yAxisIndex: false,
        },
        saveAsImage: {},
      },
    },
    legend: {
      data: props.data.echarts_indicators.map(data => formatIndicatorName(data)),
      icon: 'roundRect',
      itemGap: 25,
      itemWidth: 15,
      itemHeight: 15,
      right: 40,
      top: 40,
    },
    grid: {
      left: '3%',
      right: '4%',
      top: 70,
      bottom: 50,
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
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
      },
      {
        type: 'slider',
        xAxisIndex: 0,
        height: 20,
        handleIcon:
          'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      },
    ],
    series,
  });
}

export default echartsCumulativeFlowVis;
