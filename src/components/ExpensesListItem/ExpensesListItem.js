import {Dialog, Icon, useTheme} from '@rneui/themed';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import textStyles from '../../utils/textStyles';
import styles from './styles';

export default function ExpensesListItem({item, onDelete}) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const {theme} = useTheme();

  async function Delete() {
    onDelete();
    setDialogVisible(false);
  }

  console.log(item);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[textStyles.textMedium]}>{item.name}</Text>
        {item.type === 'expense' && (
          <>
            <Text style={[textStyles.textRegular]}>
              Categoria:{' '}
              {item.category === 'personal'
                ? 'Pessoal'
                : item.category === 'transport'
                ? 'Transporte'
                : item.category === 'health'
                ? 'Saúde'
                : item.category === 'food'
                ? 'Alimentação'
                : 'Outros'}
            </Text>
          </>
        )}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={[
            textStyles.textBold,
            {
              fontSize: 20,
              color: theme.colors[item.type === 'income' ? 'success' : 'error'],
            },
          ]}>
          {item.type === 'income' ? `+ ${item.value}` : `- ${item.value}`}
        </Text>
        <TouchableOpacity onPress={() => setDialogVisible(true)}>
          <Icon
            name="trash-can-outline"
            type="material-community"
            size={25}
            style={{marginLeft: 15}}
          />
        </TouchableOpacity>
      </View>
      <Dialog
        isVisible={dialogVisible}
        onBackdropPress={() => setDialogVisible(false)}>
        <Dialog.Title title="Deseja excluir?" />
        <Dialog.Actions>
          <Dialog.Button title={'Sim'} onPress={() => Delete()} />
          <Dialog.Button
            title={'Cancelar'}
            onPress={() => setDialogVisible(false)}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
