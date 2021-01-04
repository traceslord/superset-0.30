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
import './EchartsCumulativeFlow.css';

const CumulativeFlowData = {
  data: {
    chart: null,
    propsData: {},
    teams: [],
    teamIndex: 0,
    teamData: [],
  },
  openSelect(e) {
    const selectDropdown = e.target.parentNode.parentNode.children[1];
    if (selectDropdown.style.display) return;
    const timer = setTimeout(() => {
      selectDropdown.style.display = 'block';
      clearTimeout(timer);
    }, 100);
  },
  closeSelect() {
    const selectDropdownArr = document.getElementsByClassName('echarts-select-dropdown');
    for (let i = 0; i < selectDropdownArr.length; i++) {
      if (selectDropdownArr[i].style.display === 'block') selectDropdownArr[i].style.display = '';
    }
  },
  selectTeam(e) {
    const currentIndex = Number(e.target.dataset.index);
    CumulativeFlowData.data.teamIndex = currentIndex;
    CumulativeFlowData.drawChart();
    const echartsSelect = e.target.parentNode.parentNode.parentNode.children[0].children[0];
    const teams = CumulativeFlowData.data.teams;
    echartsSelect.value = teams[currentIndex];
    const children = e.target.parentNode.children;
    for (let i = 0; i < children.length; i++) {
      if (currentIndex === i) children[i].className = 'echarts-select-dropdown-item selected';
      else children[i].className = 'echarts-select-dropdown-item';
    }
  },
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
  drawChart() {
    const chartData = CumulativeFlowData.data.teamData[CumulativeFlowData.data.teamIndex];
    const propsData = CumulativeFlowData.data.propsData;
    const series = propsData.echarts_indicators.map(item => ({
      name: CumulativeFlowData.formatName(item),
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: chartData.map(data => data[item]),
    })).reverse();
    CumulativeFlowData.data.chart.setOption({
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
        data: propsData.echarts_indicators.map(data => CumulativeFlowData.formatName(data)),
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
          data: chartData.map(data => formatDate.formateDay(data[propsData.x_axis])),
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
  },
};

function echartsCumulativeFlowVis(element, props) {
  const propsData = props.data;
  const teams = [];
  propsData.data.forEach((data) => {
    if (teams.indexOf(data[props.data.echarts_select]) === -1) {
      teams.push(data[props.data.echarts_select]);
    }
  });
  CumulativeFlowData.data.propsData = propsData;
  CumulativeFlowData.data.teams = teams;
  CumulativeFlowData.data.teamData = teams.map(item => propsData.data.filter(data => data[props.data.echarts_select] === item));

  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000);
  const selectItem = teams.map((data, index) => `<div class="echarts-select-dropdown-item ${index === CumulativeFlowData.data.teamIndex ? 'selected' : ''}" data-index="${index}">${data}</div>`).join('');
  const selectHtml = propsData.echarts_select ? `
    <div class="echarts-select">
      <div class="echarts-select-content">
        <input class="echarts-select-content-input" id="echarts-select-${randomNumber}" type="text" readonly="readonly" autocomplete="off" placeholder="请选择小队" />
        <div class="echarts-select-content-suffix">
          <div class="echarts-select-content-suffix-icon"></div>
        </div>
      </div>
      <div class="echarts-select-dropdown">
        <div class="echarts-select-dropdown-list">${selectItem}</div>
        <div class="echarts-select-dropdown-arrow"></div>
      </div>
    </div>
  ` : '';
  const html = `${selectHtml}<div
    id="echarts-cumulative-flow-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);

  const echartsSelect = document.getElementById(`echarts-select-${randomNumber}`);
  const selectItemArr = document.getElementsByClassName('echarts-select-dropdown-item');
  echartsSelect.addEventListener('click', CumulativeFlowData.openSelect);
  for (let i = 0; i < selectItemArr.length; i++) {
    selectItemArr[i].addEventListener('click', CumulativeFlowData.selectTeam);
  }
  document.addEventListener('click', CumulativeFlowData.closeSelect);

  CumulativeFlowData.data.chart = echarts.init(document.getElementById(`echarts-cumulative-flow-${randomNumber}`), props.theme);
  CumulativeFlowData.drawChart();
  echartsSelect.value = teams[CumulativeFlowData.data.teamIndex];
}

export default echartsCumulativeFlowVis;
