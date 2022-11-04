import {useTheme} from '@rneui/themed';
import {Text, View} from 'react-native';
import textStyles from '../../utils/textStyles';
import styles from './styles';

export default function ExpensesListItem({item}) {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[textStyles.textMedium]}>{item.name}</Text>
        {item.type === 'expense' && (
          <>
            <Text style={[textStyles.textRegular]}>
              Categoria: {item.category}
            </Text>
          </>
        )}
      </View>
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
    </View>
  );
}
