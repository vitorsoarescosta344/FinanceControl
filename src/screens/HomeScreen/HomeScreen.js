import {FAB, useTheme} from '@rneui/themed';
import {useCallback, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import ChartComponent from '../../components/ChartComponent';
import ExpensesListItem from '../../components/ExpensesListItem';
import ModalAddExpenses from '../../components/ModalAddExpenses';
import Container from '../../layout/Container';
import {FinancesRealmContext} from '../../models';
import {Finances} from '../../models/Finances';

const {useQuery, useRealm} = FinancesRealmContext;

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const {theme} = useTheme();

  const realm = useRealm();

  const result = useQuery(Finances);

  const finances = useMemo(() => result.sorted('createdAt'), [result]);

  const handleDeleteFinances = useCallback(
    finance => {
      realm.write(() => {
        realm.delete(finance);
      });
    },
    [realm],
  );

  const handleAddFinances = useCallback(
    (name, type, category, value) => {
      realm.write(() => {
        realm.create(
          'Finances',
          Finances.generate(name, type, category, value),
        );
      });
    },
    [realm],
  );

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
      <ModalAddExpenses visible={true} onSubmit={handleAddFinances} />
    </>
  );
}
