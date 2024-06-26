# Визуализация данных

### Запуск проекта:

1. Клонируйте репозиторий с проектом на локальную машину;
2. Установите зависимости с помощью команды `npm install`;
3. Запустите проект с помошью команды `npm run start`.

### Что сделано:

В рамках данного тестового задания было релизовано небольшое React-приложение с использованием библиотеки echarts.js и библиотеки компонентов Consta UI Kit.

- Тултипы, отображающиеся при наведении на график и показывающие значение в данной точке;
- Отображение среднего значения за период времени;
- Возможность переключения между курсами валют;
- Компоненты из библиотеки Consta UI Kit.

1.  Загрузка данных о курсах валют из внешнего API:
       - Для загрузки данных использовался метод fetch, который делает GET-запрос к указанному эндпоинту (https://65da7fc8bcc50200fcdcfc0a.mockapi.io/api/timplate/data).
 
       - Запрос был отправлен на сервис MockAPI, который обеспечивает создание тестового API для разработки.

2.  Отображение курсов валют с помощью библиотеки ReactECharts:

    - Для визуализации данных была использована библиотека ReactECharts.

    - Данные о курсах валют были предварительно обработаны и подготовлены для передачи в компоненты ReactEChartsв виде опций option.

    - Изменен цвети линии графика на оранжевый при помощи свойств:
`lineStyle: {
        color: 'orange',
}`

    - Количество линий ограничено до 4:
`splitNumber: 4`

3.  Переключение между различными валютами с помощью ChoiceGroup из библиотеки Consta UI Kit:

    - Для осуществления переключения валют был использован компонент ChoiceGroupиз библиотеки Consta UI Kit.

    - Значения валют были представлены в виде массива и использовались в качестве параметров для ChoiceGroup.

4.  Вывод среднего значения валюты курса за выбранный период:

    - Среднее значение валюты курса за выбранный период было рассчитано с помощью метода reduce.

5.  Отображение тултипов при наведении на график для отображения показателей

    - Для отображения тултипов с информацией о значении валюты курса  была использована опция tooltip в конфигурации графики.



<p align="left">
 <img width="250" src="./assets/coter.jpg" alt="jpg"/>
</p>
