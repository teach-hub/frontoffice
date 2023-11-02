import { theme } from 'theme';
import { Chart } from 'chart.js';

export enum ChartPluginName {
  NoDataPieChart = 'noDataPieChart',
  NoDataStackedBarChart = 'noDataStackedBarChart',
}

export const configureNoDataPlugin = (chart: Chart) => {
  const ctx = chart.ctx;
  const width = chart.width;
  const height = chart.height;

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '26px Arial';
  ctx.fillStyle = theme.colors.teachHub.gray;
  ctx.fillText('No hay datos', width / 2, height / 2);
  ctx.restore();
};
