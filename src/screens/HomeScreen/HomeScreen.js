import {FAB, useTheme} from '@rneui/themed';
import {FlatList, View} from 'react-native';
import ChartComponent from '../../components/ChartComponent';
import ExpensesListItem from '../../components/ExpensesListItem';
import Container from '../../layout/Container';

export default function HomeScreen() {
  const {theme} = useTheme();

  return (
    <>
      <Container>
        <View style={{flex: 1, paddingVertical: 10}}>
          <ChartComponent />
          {/* <FlatList /> */}
          <ExpensesListItem
            item={{
              name: 'Lojas Renner',
              type: 'expense',
              category: 'Pessoais',
              value: '10,00',
            }}
          />
        </View>
      </Container>
      <FAB
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color={theme.colors.primary}
      />
    </>
  );
}
