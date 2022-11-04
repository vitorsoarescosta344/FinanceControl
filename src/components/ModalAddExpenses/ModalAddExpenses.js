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
import {FinancesRealmContext} from '../../models';
import textStyles from '../../utils/textStyles';
import styles from './styles';

const {useRealm} = FinancesRealmContext;

export default function ModalAddExpenses({visible, setVisible, onSubmit}) {
  const realm = useRealm();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    onSubmit(name, description);
    setName('');
    setDescription('');
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
          <>
            {loading ? (
              <>
                <ActivityIndicator color={'#1A84BF'} />
              </>
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonContainer}>
                <Text style={textStyles.textBold}>Adicionar</Text>
              </TouchableOpacity>
            )}
          </>
        </View>
      </Pressable>
    </Modal>
  );
}
