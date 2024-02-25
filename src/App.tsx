import React, { useEffect, useState } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { mockData } from './data/data';
import { ReactECharts } from './Echarts/ReactECharts';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { cnMixFlex } from '@consta/uikit/MixFlex';

type Item = string;

const items: Item[] = ['$', '€', '¥'];

function App() {
  //отпредление интерфейса для данных
  interface DataItem {
    indicator: string;
    value: number;
    month: string;
  }

  const [selectedCurrantly, setSelectedCurrency] = useState<Item | null>(
    items[0]
  );
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    //запрос к API для получения данных
    fetch('https://65da7fc8bcc50200fcdcfc0a.mockapi.io/api/timplate/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }, []);

  //фильтрация данных в соответствии с выбранной валютой
  const filterData = data.filter((item) => {
    if (selectedCurrantly === '$') {
      return item.indicator === 'Курс доллара';
    } else if (selectedCurrantly === '€') {
      return item.indicator === 'Курс евро';
    } else if (selectedCurrantly === '¥') {
      return item.indicator === 'Курс юаня';
    }
    return false;
  });

  //вычисление среднего значения курса валюты за выбранный период
  const sum = filterData.reduce((total, item) => total + item.value, 0);
  const avarge = sum / filterData.length;

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

  return (
    <Theme preset={presetGpnDefault}>
      <Layout direction="row">
        <Layout flex={2}>
          <Text size="3xl" weight="bold">
            {chartTitle}, {selectedCurrantly}/₽
          </Text>
        </Layout>
        <Layout
          flex={1}
          className={cnMixFlex({
            justify: 'flex-end',
            align: 'flex-end',
          })}
        >
          <div>
            <ChoiceGroup
              value={selectedCurrantly}
              onChange={({ value }) => setSelectedCurrency(value)}
              items={items}
              getItemLabel={(item) => item}
              name="name"
              size="s"
            />
          </div>
        </Layout>
      </Layout>
      <Layout direction="row">
        <Layout flex={3}>
          <ReactECharts
            option={option}
            theme="light"
            style={{ width: '100%', height: '400px' }}
          />
        </Layout>
        <Layout
          flex={1}
          className={cnMixFlex({
            direction: 'column',
            justify: 'center',
            // align: 'center',
            wrap: 'wrap',
            // gap: 'xs',
          })}
        >
          <Text view="secondary" weight="medium" size="xl">
            Среднее за период
          </Text>
          <div
            className={cnMixFlex({
              direction: 'row',
              align: 'center',
            })}
          >
            <Text size="5xl" view="caution">
              {avarge.toFixed(1)}
            </Text>
            <Text view="secondary" size="3xl" spacing="l">
              ₽
            </Text>
          </div>
        </Layout>
      </Layout>
    </Theme>
  );
}

export default App;
