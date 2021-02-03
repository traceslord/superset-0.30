import { Preset } from '@superset-ui/core';
import AreaChartPlugin from '../nvd3/Area/AreaChartPlugin';
import BarChartPlugin from '../nvd3/Bar/BarChartPlugin';
import BigNumberChartPlugin from '../BigNumber/BigNumberChartPlugin';
import BigNumberTotalChartPlugin from '../BigNumberTotal/BigNumberTotalChartPlugin';
import BoxPlotChartPlugin from '../nvd3/BoxPlot/BoxPlotChartPlugin';
import BubbleChartPlugin from '../nvd3/Bubble/BubbleChartPlugin';
import DistBarChartPlugin from '../nvd3/DistBar/DistBarChartPlugin';
import EchartsBarDatasetChartPlugin from '../EchartsBarDataset/EchartsBarDatasetChartPlugin';
import EchartsBarPlusminusChartPlugin from '../EchartsBarPlusminus/EchartsBarPlusminusChartPlugin';
import EchartsBarStackedChartPlugin from '../EchartsBarStacked/EchartsBarStackedChartPlugin';
import EchartsBarStacked2ChartPlugin from '../EchartsBarStacked2/EchartsBarStacked2ChartPlugin';
import EchartsCumulativeFlowChartPlugin from '../EchartsCumulativeFlow/EchartsCumulativeFlowChartPlugin';
import EchartsFunnelChartPlugin from '../EchartsFunnel/EchartsFunnelChartPlugin';
import EchartsGanttTimeChartPlugin from '../EchartsGanttTime/EchartsGanttTimeChartPlugin';
import EchartsHeatmapCartesianChartPlugin from '../EchartsHeatmapCartesian/EchartsHeatmapCartesianChartPlugin';
import EchartsHydrographChartPlugin from '../EchartsHydrograph/EchartsHydrographChartPlugin';
import EchartsLineMixedChartPlugin from '../EchartsLineMixed/EchartsLineMixedChartPlugin';
import EchartsScatterBubbleChartPlugin from '../EchartsScatterBubble/EchartsScatterBubbleChartPlugin';
import FilterBoxChartPlugin from '../FilterBox/FilterBoxChartPlugin';
import HistogramChartPlugin from '../Histogram/HistogramChartPlugin';
import LineChartPlugin from '../nvd3/Line/LineChartPlugin';
import PieChartPlugin from '../nvd3/Pie/PieChartPlugin';
import PivotTableChartPlugin from '../PivotTable/PivotTableChartPlugin';
import TableChartPlugin from '../Table/TableChartPlugin';
import TimeTableChartPlugin from '../TimeTable/TimeTableChartPlugin';
import WordCloudChartPlugin from '../wordcloud/WordCloudChartPlugin';

export default class CommonChartPreset extends Preset {
  constructor() {
    super({
      name: 'Common charts',
      plugins: [
        new AreaChartPlugin().configure({ key: 'area' }),
        new BarChartPlugin().configure({ key: 'bar' }),
        new BigNumberChartPlugin().configure({ key: 'big_number' }),
        new BigNumberTotalChartPlugin().configure({ key: 'big_number_total' }),
        new BoxPlotChartPlugin().configure({ key: 'box_plot' }),
        new BubbleChartPlugin().configure({ key: 'bubble' }),
        new DistBarChartPlugin().configure({ key: 'dist_bar' }),
        new EchartsBarDatasetChartPlugin().configure({ key: 'echarts_bar_dataset' }),
        new EchartsBarPlusminusChartPlugin().configure({ key: 'echarts_bar_plusminus' }),
        new EchartsBarStackedChartPlugin().configure({ key: 'echarts_bar_stacked' }),
        new EchartsBarStacked2ChartPlugin().configure({ key: 'echarts_bar_stacked_2' }),
        new EchartsCumulativeFlowChartPlugin().configure({ key: 'echarts_cumulative_flow' }),
        new EchartsFunnelChartPlugin().configure({ key: 'echarts_funnel' }),
        new EchartsGanttTimeChartPlugin().configure({ key: 'echarts_gantt_time' }),
        new EchartsHeatmapCartesianChartPlugin().configure({ key: 'echarts_heatmap_cartesian' }),
        new EchartsHydrographChartPlugin().configure({ key: 'echarts_hydrograph' }),
        new EchartsLineMixedChartPlugin().configure({ key: 'echarts_line_mixed' }),
        new EchartsScatterBubbleChartPlugin().configure({ key: 'echarts_scatter_bubble' }),
        new FilterBoxChartPlugin().configure({ key: 'filter_box' }),
        new HistogramChartPlugin().configure({ key: 'histogram' }),
        new LineChartPlugin().configure({ key: 'line' }),
        new PieChartPlugin().configure({ key: 'pie' }),
        new PivotTableChartPlugin().configure({ key: 'pivot_table' }),
        new TableChartPlugin().configure({ key: 'table' }),
        new TimeTableChartPlugin().configure({ key: 'time_table' }),
        new WordCloudChartPlugin().configure({ key: 'word_cloud' }),
      ],
    });
  }
}
