import React from 'react';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {FinancesRealmContext} from './src/models';
import ChartComponent from './src/components/ChartComponent';
import HomeScreen from './src/screens/HomeScreen';

const theme = createTheme({});

export default function App() {
  const {RealmProvider} = FinancesRealmContext;

  return (
    <RealmProvider>
      <ThemeProvider theme={theme}>
        <HomeScreen />
      </ThemeProvider>
    </RealmProvider>
  );
}
