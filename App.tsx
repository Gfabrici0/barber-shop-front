import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/theme/theme';
import { ThemeProvider } from '@rneui/themed';
import Navigator from './src/routes';


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigator/>
    </ThemeProvider>
  );
}
