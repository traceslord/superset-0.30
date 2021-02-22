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

function echartsBarStacked2Vis(element, props) {
  const splitData = props.data.data;
  const propsData = splitData.index.map(item => ({ name: item, sum: 0 }));
  splitData.columns.forEach((item, itemIndex) => {
    propsData.forEach((subitem, subIndex) => {
      subitem[item[1]] = splitData.data[subIndex][itemIndex];
      subitem.sum += subitem[item[1]];
    });
  });
  propsData.sort((a, b) => a.sum - b.sum);
  const series = splitData.columns.map((item) => {
    if (props.data.cancel_stack) {
      return {
        name: item[1],
        type: 'bar',
        data: propsData.map(data => data[item[1]]),
      };
    }
      return {
        name: item[1],
        type: 'bar',
        stack: '堆叠',
        label: {
          show: true,
          position: props.data.echarts_label_position,
        },
        data: propsData.map(data => data[item[1]]),
      };
  });
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 10000000000000000);
  const html = `<div
    id="echarts-bar-stacked-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-bar-stacked-${randomNumber}`), props.theme);
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
    legend: {
      data: splitData.columns.map(data => data[1]),
      icon: 'roundRect',
      itemGap: 25,
      itemWidth: 15,
      itemHeight: 15,
      top: 15,
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
        name: props.data.x_axis_label,
      },
    ],
    yAxis: [
      {
        type: 'category',
        name: props.data.y_axis_label,
        data: propsData.map(data => data.name),
      },
    ],
    series,
  });
}

export default echartsBarStacked2Vis;
