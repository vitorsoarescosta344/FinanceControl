import {Dimensions, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import styles from './styles';

export default function ChartComponent() {
  let width = Dimensions.get('window').width;
  const data = [50, 20, 2, 86];
  const colorBar = [
    `rgba(236,255,0, ${1})`,
    `rgba(66,255, 0, ${1})`,
    `rgba(0,255,224, ${1})`,
    `rgba(255,0,247, ${1})`,
  ];

  return (
    <>
      <View style={styles.container}>
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
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
              {
                data: data,

                colors: [
                  (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                  (opacity = 1) => `rgba(66, 255, 0, ${opacity})`,
                  (opacity = 1) => `rgba(0, 255, 224, ${opacity})`,
                  (opacity = 1) => `rgba(255, 0, 247, ${opacity})`,
                ],
              },
            ],
          }}
        />
      </View>
    </>
  );
}
