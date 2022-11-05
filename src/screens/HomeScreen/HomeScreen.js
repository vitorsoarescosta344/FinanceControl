import {FAB, useTheme} from '@rneui/themed';
import {useCallback, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import ChartComponent from '../../components/ChartComponent';
import ExpensesListItem from '../../components/ExpensesListItem';
import ModalAddExpenses from '../../components/ModalAddExpenses';
import Container from '../../layout/Container';
import {FinancesRealmContext} from '../../models';
import {Finances} from '../../models/Finances';
import {data} from '../../utils/mockdata';

const {useQuery, useRealm} = FinancesRealmContext;

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const {theme} = useTheme();

  const realm = useRealm();

  const result = useQuery(Finances);

  {
    /** 

  <Picker.Item label="Pessoal" value={'personal'} />
                  <Picker.Item label="Alimentação" value={'food'} />
                  <Picker.Item label="Transporte" value={'transport'} />
                  <Picker.Item label="Saúde" value={'health'} />
                  <Picker.Item label="Outros" value={'other'} />
*/
  }

  let personal = 0;
  let food = 0;
  let transport = 0;
  let health = 0;
  let other = 0;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    if (element.category === 'personal') {
      personal += parseFloat(element.value.replace(',', '.'));
    } else if (element.category === 'food') {
      food += parseFloat(element.value.replace(',', '.'));
    } else if (element.category === 'transport') {
      transport += parseFloat(element.value.replace(',', '.'));
    } else if (element.category === 'health') {
      health += parseFloat(element.value.replace(',', '.'));
    } else if (element.category === 'other') {
      other += parseFloat(element.value.replace(',', '.'));
    }
  }

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
          <ChartComponent
            dataArray={[personal, food, transport, health, other]}
          />
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
        onPress={() => setModalVisible(!modalVisible)}
        icon={{name: 'add', color: 'white'}}
        color={theme.colors.primary}
        visible={!modalVisible}
      />
      <ModalAddExpenses
        visible={modalVisible}
        setVisible={setModalVisible}
        onSubmit={handleAddFinances}
      />
    </>
  );
}
