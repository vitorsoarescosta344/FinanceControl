import {FAB, useTheme} from '@rneui/themed';
import {useEffect} from 'react';
import {useCallback, useMemo, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import ChartComponent from '../../components/ChartComponent';
import ExpensesListItem from '../../components/ExpensesListItem';
import ModalAddExpenses from '../../components/ModalAddExpenses';
import Container from '../../layout/Container';
import {FinancesRealmContext} from '../../models';
import {Finances} from '../../models/Finances';
import {data} from '../../utils/mockdata';
import textStyles from '../../utils/textStyles';

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
  let income = 0;

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

  let amount = '0';

  for (let index = 0; index < finances.length; index++) {
    const element = finances[index];

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
    } else if (element.type === 'income') {
      income += parseFloat(element.value.replace(',', '.'));
    }
  }

  amount = parseFloat(
    income - (personal + food + transport + health + other),
  ).toFixed(2);

  console.log(personal);

  return (
    <>
      <Container>
        <View style={{flex: 1, paddingVertical: 10}}>
          <View style={{paddingHorizontal: 15, marginBottom: 20}}>
            <Text style={[textStyles.textBold, {fontSize: 20}]}>Despesas</Text>
          </View>
          <ChartComponent
            dataArray={[personal, food, transport, health, other]}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              borderBottomColor: '#D9D9D9',
              borderBottomWidth: 2,
              borderTopColor: '#D9D9D9',
              borderTopWidth: 2,
            }}>
            <Text style={[textStyles.textBold, {fontSize: 22}]}>Saldo: </Text>
            <Text
              style={[
                textStyles.textBold,
                {
                  fontSize: 22,
                  color:
                    theme.colors[amount.includes('-') ? 'error' : 'success'],
                },
              ]}>
              {amount}
            </Text>
          </View>
          <FlatList
            data={finances}
            keyExtractor={item => item._id.toString()}
            renderItem={({item, index}) => {
              return (
                <ExpensesListItem
                  item={item}
                  onDelete={() => handleDeleteFinances(item)}
                />
              );
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
