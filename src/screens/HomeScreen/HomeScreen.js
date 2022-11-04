import {FAB, useTheme} from '@rneui/themed';
import {FlatList} from 'react-native';
import ChartComponent from '../../components/ChartComponent';
import ExpensesListItem from '../../components/ExpensesListItem';
import Container from '../../layout/Container';

export default function HomeScreen() {
  const {theme} = useTheme();

  return (
    <>
      <Container>
        <ChartComponent />
        {/* <FlatList /> */}
        <ExpensesListItem />
        <ExpensesListItem />
        <ExpensesListItem />
        <ExpensesListItem />
        <ExpensesListItem />
        <ExpensesListItem />
      </Container>
      <FAB
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color={theme.colors.primary}
      />
    </>
  );
}
