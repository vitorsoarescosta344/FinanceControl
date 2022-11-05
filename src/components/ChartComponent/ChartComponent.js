import {Dimensions, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import styles from './styles';

export default function ChartComponent({dataArray}) {
  let width = Dimensions.get('window').width;
  const data = [50, 20, 2, 86, 22];
  const colorBar = [
    `rgba(236,255,0, ${1})`,
    `rgba(66,255, 0, ${1})`,
    `rgba(0,255,224, ${1})`,
    `rgba(255,0,247, ${1})`,
  ];

  return (
    <>
      <BarChart
        width={width}
        height={200}
        withCustomBarColorFromData={true}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        data={{
          labels: ['Pessoal', 'Alimentação', 'Transporte', 'Saúde', 'Outros'],
          datasets: [
            {
              data: dataArray,

              colors: [
                (opacity = 1) => `rgba(255, 224, 0, ${opacity})`,
                (opacity = 1) => `rgba(0, 205, 255, ${opacity})`,
                (opacity = 1) => `rgba(46, 0, 255, ${opacity})`,
                (opacity = 1) => `rgba(255, 0, 50, ${opacity})`,
                (opacity = 1) => `rgba(152, 152, 152, ${opacity})`,
              ],
            },
          ],
        }}
      />
    </>
  );
}
