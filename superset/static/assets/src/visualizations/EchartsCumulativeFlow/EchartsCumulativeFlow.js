import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';

const CumulativeFlowFun = {
  formatName(name) {
    switch (name) {
      case 'todo_count':
        return '待办';
      case 'assess_count':
        return '安全评审';
      case 'design_count':
        return '设计';
      case 'dev_count':
        return '开发中';
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
  },
  drawChart(chart, propsData, teamData, teamIndex) {
    const chartData = teamData[teamIndex];
    const series = propsData.echarts_indicators.map(item => ({
      name: CumulativeFlowFun.formatName(item),
      type: 'line',
      stack: 'stack',
      areaStyle: {},
      data: chartData.map(data => data[item]),
    })).reverse();
    chart.setOption({
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
          dataView: {
            show: propsData.data_view,
          },
          saveAsImage: {
            show: propsData.save_as_image,
          },
        },
      },
      legend: {
        data: propsData.echarts_indicators.map(data => CumulativeFlowFun.formatName(data)),
        icon: 'roundRect',
        itemGap: 25,
        itemWidth: 15,
        itemHeight: 15,
        right: '4%',
        top: 40,
      },
      grid: {
        left: '3%',
        right: '4%',
        top: 70,
        bottom: 70,
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          name: propsData.x_axis_label,
          boundaryGap: false,
          data: chartData.map(data => formatDate.formateDay(data[propsData.x_axis])),
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: propsData.y_axis_label,
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
  },
};

function echartsCumulativeFlowVis(element, props) {
  echartsVis(element, props, CumulativeFlowFun.drawChart);
}

export default echartsCumulativeFlowVis;
