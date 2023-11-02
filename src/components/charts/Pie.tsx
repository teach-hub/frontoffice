import { ChartProps, Pie as ChartJsPie } from 'react-chartjs-2';
import { theme } from 'theme';
import React from 'react';
import { Chart, LayoutPosition } from 'chart.js';
import { ChartPluginName, configureNoDataPlugin } from 'components/charts/chartPlugins';

type ChartData = {
  label: string;
  data: number[];
  backgroundColors: string[];
};

export const Pie = ({
  labels,
  data,
  props,
  title,
  legendPosition,
}: {
  title: string;
  labels: string[];
  data: ChartData;
  props?: ChartProps;
  horizontal?: boolean;
  legendPosition?: LayoutPosition;
}) => {
  const emptyChart = () => {
    const emptyLabels = labels.length === 0;
    const emptyData = data.data.every(d => d === 0);
    return emptyLabels || emptyData;
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: data.label,
        data: data.data,
        backgroundColor: data.backgroundColors,
        hoverOffset: 10,
      },
    ],
  };
  const FONT_SIZE = 16;

  return (
    <ChartJsPie
      {...props}
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: theme.styles.global.body.fontSize,
            },
          },
          legend: {
            display: !emptyChart(), // Only show legends if chart is not empty
            labels: {
              font: {
                size: FONT_SIZE,
              },
            },
            ...(legendPosition ? { position: legendPosition } : {}),
          },
        },
      }}
      plugins={[
        {
          id: ChartPluginName.NoDataPieChart,
          beforeDraw: (chart: Chart) => {
            if (emptyChart()) configureNoDataPlugin(chart);
          },
        },
      ]}
    />
  );
};
