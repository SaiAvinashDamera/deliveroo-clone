import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import BasketScreen from './Screens/BasketScreen';
import DeliveryScreen from './Screens/DeliveryScreen';
import HomeScreen from './Screens/HomeScreen';
import PreparingOrderScreen from './Screens/PreparingOrderScreen';
import RestaurantScreen from './Screens/RestaurantScreen';
import { store } from './store';

const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
          <Stack.Screen name="Basket" component={BasketScreen}
            options={{gestureEnabled: true, presentation: "transparentModal", headerShown: false}}
          />
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen}
            options={{presentation: "fullScreenModal", headerShown: false}}
          />
          <Stack.Screen name="Delivery" component={DeliveryScreen}
            options={{presentation: "fullScreenModal", headerShown: false}}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}