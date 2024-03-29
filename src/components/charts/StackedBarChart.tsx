import { Bar, ChartProps } from 'react-chartjs-2';
import { theme } from 'theme';
import { Chart } from 'chart.js';
import { ChartPluginName, configureNoDataPlugin } from 'components/charts/chartPlugins';

type ChartData<T> = {
  label: string;
  data: T[];
  backgroundColor: string;
};

export const StackedBarChart = <T,>({
  labels,
  data,
  props,
  title,
  horizontal,
}: {
  title: string;
  labels: string[];
  data: ChartData<T>[];
  props?: ChartProps;
  horizontal?: boolean;
}) => {
  const emptyChart = () => {
    const emptyLabels = labels.length === 0;
    const emptyData = data.length === 0 || data.every(d => d.data.length === 0);
    return emptyLabels || emptyData;
  };

  const formatTick = (tick: string) => {
    const LABEL_MAX_LENGTH = 30;
    if (tick.length > LABEL_MAX_LENGTH) {
      return tick.substring(0, LABEL_MAX_LENGTH) + '...'; // Truncate and add ellipsis
    }
    return tick;
  };

  const chartData = {
    labels,
    datasets: data.map(dataset => {
      return {
        label: dataset.label,
        data: dataset.data,
        backgroundColor: dataset.backgroundColor,
      };
    }),
  };
  const indexAxis = horizontal ? 'y' : 'x';
  const STACKED = true;
  const PRECISION = 0; // Set the number of decimal places for ticks
  const FONT_SIZE = 16;

  return (
    <Bar
      {...props}
      data={chartData}
      options={{
        indexAxis: indexAxis,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: theme.styles.global.body.fontSize,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            stacked: STACKED,
            ticks: {
              precision: PRECISION,
              font: {
                size: FONT_SIZE,
              },
              callback: function (val, index) {
                // Set as function to be able to access this.getLabelForValue(index)
                return formatTick(this.getLabelForValue(index));
              },
            },
          },
          x: {
            stacked: STACKED,
            ticks: {
              precision: PRECISION,
              font: {
                size: FONT_SIZE,
              },
              callback: function (val, index) {
                // Set as function to be able to access this.getLabelForValue(index)
                return formatTick(this.getLabelForValue(index));
              },
            },
          },
        },
      }}
      plugins={[
        {
          id: ChartPluginName.NoDataStackedBarChart,
          afterDraw: (chart: Chart) => {
            if (emptyChart()) configureNoDataPlugin(chart);
          },
        },
      ]}
    />
  );
};
