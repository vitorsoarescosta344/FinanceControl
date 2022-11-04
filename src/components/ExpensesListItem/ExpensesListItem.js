import {Text, View} from 'react-native';
import textStyles from '../../utils/textStyles';
import styles from './styles';

export default function ExpensesListItem({item}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[textStyles.textMedium]}>Lojas Renner</Text>
        <Text style={[textStyles.textRegular]}>Categoria: Pessoais</Text>
      </View>
      <Text style={[textStyles.textBold, {fontSize: 20}]}>99,99</Text>
    </View>
  );
}
