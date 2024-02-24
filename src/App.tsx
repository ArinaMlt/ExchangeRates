import React, { useState } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { mockData } from './data/data';
import { ReactECharts } from './Echarts/ReactECharts';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';

type Item = string;

const items = ['USD', 'EUR', 'CNY'];

function App() {
  const [selectedCurrantly, setSelectedCurrency] = useState<Item | null>(
    items[0]
  );

  const filterData = mockData.filter((item) => {
    if (selectedCurrantly === 'USD') {
      return item.indicator === 'Курс доллара';
    } else if (selectedCurrantly === 'EUR') {
      return item.indicator === 'Курс евро';
    } else if (selectedCurrantly === 'CNY') {
      return item.indicator === 'Курс юаня';
    }
    return false;
  });



  const chartTitle = filterData.length > 0 ? filterData[0].indicator : '';

  const option = {
    xAxis: {
      type: 'category',
      data: filterData.map((item) => item.month),
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      // formatter: function (params) {
      //   const indicator = params[0]?.data?.indicator;
      //   return '${indicator}: ${params[0]?.value}';
      // },
    },
    series: [
      {
        data: filterData.map((item) => ({
          value: item.value,
          indicator: item.indicator,
        })),
        type: 'line',
      },
    ],
  };

  // const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Theme preset={presetGpnDefault}>
      <Layout direction="row">
        <Layout flex={4}>
          <div>
            {' '}
            <Text  size="3xl" weight="semibold">{chartTitle}</Text>
          </div>
        </Layout>
        <Layout flex={1}>
          <div>
            <ChoiceGroup
              value={selectedCurrantly}
              onChange={({ value }) => setSelectedCurrency(value)}
              items={items}
              getItemLabel={(item) => item}
              name="name"
              size="xs"
            />
          </div>
        </Layout>
      </Layout>
      <ReactECharts
        option={option}
        // title={selectedCurrantly === 'USD' ? 'Курс доллара' : selectedCurrantly === 'EUR' ? 'Курс евро' : 'Курс юаня'}
        theme="light"
        style={{ width: '100%', height: '400px' }}
      />
    </Theme>
  );
}

export default App;
