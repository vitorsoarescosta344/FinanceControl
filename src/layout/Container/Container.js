import {SafeAreaProvider} from 'react-native-safe-area-context';
import styles from './styles';

export default function Container({children}) {
  return (
    <SafeAreaProvider style={styles.container}>{children}</SafeAreaProvider>
  );
}
