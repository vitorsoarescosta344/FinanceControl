import React from 'react';
import {ThemeProvider, createTheme} from '@rneui/themed';
import ChartComponent from './src/components/ChartComponent';
import HomeScreen from './src/screens/HomeScreen';

const theme = createTheme({});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>
  );
}
