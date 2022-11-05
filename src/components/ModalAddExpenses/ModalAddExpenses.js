import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MaskInput, {Masks} from 'react-native-mask-input';
import {FinancesRealmContext} from '../../models';
import textStyles from '../../utils/textStyles';
import styles from './styles';
import {formatCurrency} from 'react-native-format-currency';
import {useTheme} from '@rneui/themed';

const {useRealm} = FinancesRealmContext;

export default function ModalAddExpenses({visible, setVisible, onSubmit}) {
  const realm = useRealm();

  const [name, setName] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('personal');
  const [value, setValue] = useState('');

  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();

  const handleSubmit = () => {
    onSubmit(name, type, type === 'income' ? null : category, value);
    setName('');
    setValue('');
    setVisible(false);
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <Pressable onPress={() => setVisible(false)} style={styles.background}>
        <View style={styles.modalContainer}>
          <Text
            style={[textStyles.textBold, {color: '#000', marginBottom: 20}]}>
            Novo
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Nome"
              style={[textStyles.textRegular, {color: '#333'}]}
              value={name}
              onChangeText={text => {
                text.length === 80 ? console.log(text.length) : setName(text);
              }}
            />
          </View>
          <View style={[styles.dropdownContainer, {marginBottom: 20}]}>
            <Picker
              mode="dropdown"
              selectedValue={type}
              onValueChange={v => setType(v)}>
              <Picker.Item label="Entrada" value={'income'} />
              <Picker.Item label="Saida" value={'expense'} />
            </Picker>
          </View>
          {type === 'expense' && (
            <>
              <View style={[styles.dropdownContainer, {marginBottom: 20}]}>
                <Picker
                  mode="dropdown"
                  selectedValue={category}
                  onValueChange={v => setCategory(v)}>
                  <Picker.Item label="Pessoal" value={'personal'} />
                  <Picker.Item label="Alimentação" value={'food'} />
                  <Picker.Item label="Transporte" value={'transport'} />
                  <Picker.Item label="Saúde" value={'health'} />
                  <Picker.Item label="Outros" value={'other'} />
                </Picker>
              </View>
            </>
          )}
          <View style={styles.textInputContainer}>
            <MaskInput
              mask={Masks.BRL_CURRENCY}
              placeholder="Valor"
              style={[textStyles.textRegular, {color: '#333'}]}
              value={value}
              keyboardType="decimal-pad"
              onChangeText={text => setValue(text.replace('R$ ', ''))}
            />
          </View>
          <>
            {loading ? (
              <>
                <ActivityIndicator color={'#1A84BF'} />
              </>
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonContainer}>
                <Text
                  style={[textStyles.textBold, {color: theme.colors.white}]}>
                  Adicionar
                </Text>
              </TouchableOpacity>
            )}
          </>
        </View>
      </Pressable>
    </Modal>
  );
}
