import { ChartProps, Pie as ChartJsPie } from 'react-chartjs-2';
import { theme } from 'theme';
import React from 'react';
import { LayoutPosition } from 'chart.js';

type ChartData<T> = {
  label: string;
  data: T[];
  backgroundColors: string[];
};

export const Pie = <T,>({
  labels,
  data,
  props,
  title,
  legendPosition,
}: {
  title: string;
  labels: string[];
  data: ChartData<T>;
  props?: ChartProps;
  horizontal?: boolean;
  legendPosition?: LayoutPosition;
}) => {
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
            display: true,
            labels: {
              font: {
                size: FONT_SIZE,
              },
            },
            ...(legendPosition ? { position: legendPosition } : {}),
          },
        },
      }}
    />
  );
};
