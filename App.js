import { Provider as PaperProvider } from 'react-native-paper';
import Index from './src/pages/index';
import Details from './src/pages/details';
import Login from './src/pages/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            initial={true}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name='Home' component={Index} />
          <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
