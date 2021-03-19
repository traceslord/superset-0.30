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

function echartsGanttTimeVis(element, props) {
  const planData = props.data.data.map((item) => {
    const startTime = new Date(item[props.data.echarts_start_time]).getTime();
    const endTime = new Date(item[props.data.echarts_end_time]).getTime();
    return {
      yAxis: item[props.data.echarts_name],
      startTime,
      endTime: item[props.data.echarts_end_time] ? endTime : startTime + 86400000 * 100,
      progress: item[props.data.echarts_indicator],
    };
  });
  const currentProgress = planData.map(data => (
      ((data.endTime - data.startTime) * data.progress) / 100 +
      data.startTime
    ));
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000000000000000);
  const html = `<div
    id="echarts-gantt-time-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-gantt-time-${randomNumber}`), props.theme);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params) => {
        const progress =
          ((params[1].value - params[2].value) /
            (params[0].value - params[2].value)) *
          100;
        let res = params[0].name + '：<br />';
        res += '计划开始时间：' + formatDate.formateDay(params[2].value) + '<br />';
        res += '计划结束时间：' + formatDate.formateDay(params[0].value) + '<br />';
        res += params[1].seriesName + '：' + progress;
        return res;
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: props.data.save_as_image,
        },
      },
    },
    grid: {
      show: false,
      left: '3%',
      right: '4%',
      top: 60,
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'time',
      axisLine: {
        lineStyle: {
          color: '#bdc8cd',
          width: 1,
        },
      },
      axisLabel: {
        margin: 12,
        color: '#1c2431',
        formatter: value => formatDate.formateDay(value),
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      data: planData.map(item => item.yAxis),
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#e9e9ea',
          width: 1,
        },
      },
      axisLabel: {
        interval: 0,
        color: '#1c2431',
        formatter: (value) => {
          let newValue = '';
          const num = 15;
          const row = Math.ceil(value.length / num);
          if (value.length > num) {
            for (let i = 0; i < row; i++) {
              let valueSlice = '';
              if (i === row - 1) {
                valueSlice = value.slice(num * i, value.length);
              } else {
                valueSlice = value.slice(num * i, num * (i + 1)) + '\n';
              }
              newValue += valueSlice;
            }
          } else {
            newValue = value;
          }
          return newValue;
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eaeae9',
          width: 1,
        },
      },
    },
    series: [
      {
        type: 'bar',
        name: '计划周期',
        stack: 'time',
        itemStyle: {
          normal: {
            color: '#cbdff6',
            barBorderColor: '#f0f2f5',
          },
          emphasis: {
            color: '#cbdff6',
            barBorderColor: '#f0f2f5',
          },
        },
        barWidth: 15,
        zlevel: -1,
        data: planData.map(item => item.endTime),
        markLine: {
          symbol: ['none', 'none'],
          label: {
            formatter: params => '今天：' + formatDate.formateDay(params.value),
          },
          lineStyle: {
            color: '#909399',
          },
          data: [{ xAxis: new Date() }],
        },
      },
      {
        type: 'bar',
        name: '当前进度',
        stack: 'time',
        itemStyle: {
          normal: {
            color: '#1890ff',
            barBorderColor: '#f0f2f5',
          },
          emphasis: {
            color: '#1890ff',
            barBorderColor: '#f0f2f5',
          },
        },
        barWidth: 15,
        zlevel: -1,
        z: 2,
        data: currentProgress,
      },
      {
        type: 'bar',
        name: '隐藏',
        stack: 'time',
        itemStyle: {
          normal: {
            color: '#f0f2f5',
            barBorderColor: '#f0f2f5',
          },
          emphasis: {
            color: '#f0f2f5',
            barBorderColor: '#f0f2f5',
          },
        },
        barWidth: 15,
        zlevel: -1,
        z: 3,
        data: planData.map(item => item.startTime),
      },
    ],
  });
}

export default echartsGanttTimeVis;
