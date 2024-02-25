import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { CSSProperties } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text';
import { Layout } from '@consta/uikit/Layout';

import { forceResizeCharts } from './UtilsForCharts';

interface IOnEvents {
  type: string;
  func: Function;
}

export interface ReactEChartsProps {
  option: any; // We leave any, since not all typed echarts options are needed to work
  onEvents?: IOnEvents;
  style?: CSSProperties;
  settings?: echarts.SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  forceResize?: boolean;
}

export interface ILegendselectchangedParams {
  name: string;
  selected: Record<string, boolean>;
  type: string;
}

export function ReactECharts({
  option,
  onEvents,
  style,
  settings,
  loading,
  theme,
  forceResize = true,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined;

    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener('resize', resizeChart);

    let observer: MutationObserver | false | undefined = false;

    if (forceResize) observer = forceResizeCharts(resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(
        {
          ...option,
          tooltip: {
            show: true,
            trigger: 'axis',
            formatter: (params: any) => {
              const dataIndex = params[0]?.dataIndex;
              const value = option.series[0].data[dataIndex].value;
              const indicator = option.series[0].data[dataIndex].indicator;
              const month = option.xAxis.data[dataIndex];
              const color = 'orange';
              return `
              <Theme preset={presetGpnDefault}>
              <Text>${month} год</Text>
              <br/>
              <span style="width: 10px;
                height: 10px;
                background-color: orange;
                border-radius: 50%;
                display: inline-block"> 
                </span> 
                <Text view="secondary"> ${indicator}</Text>
                <Text> ${value} ₽</Text>
              </Theme>
            `;
            },
            borderWidth: '195px',
            textStyle: {
              color: '#002033',
            },
          },
          series: [
            {
              ...option.series[0],
              symbol: 'none',
              lineStyle: {
                color: 'orange',
              },
            },
          ],
          yAxis: [
            {
              ...option.yAxis[0],
              scale: true,
              splitNumber: 4,
            },
          ],
        },
        settings
      );

      chart?.on(onEvents?.type!, function (params: any) {
        onEvents?.func(params);
        chart?.setOption(option, settings);
      });
    }
  }, [option, settings, onEvents, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);

      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
  );
}
