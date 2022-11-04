import {FAB, useTheme} from '@rneui/themed';
import ChartComponent from '../../components/ChartComponent';
import Container from '../../layout/Container';

export default function HomeScreen() {
  const {theme} = useTheme();

  return (
    <>
      <Container>
        <ChartComponent />
      </Container>
      <FAB
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color={theme.colors.primary}
      />
    </>
  );
}
