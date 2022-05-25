import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from "./Screens/CartScreen";
import MainScreen from "./Screens/MainScreen";

import { Provider } from 'react-redux';
import { store } from './store';

const Tab = createBottomTabNavigator();

const mapStateToProps = (state: any) => {

    return {
        switch: state.appLoad.switch,

    }};


interface Props {
  title: string;
}

function MyTabs (props: any) {
  return (

      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
  );
}

const App: React.FC<Props> = ({title}) => {
  return (
      <Provider store={store}>
      <NavigationContainer>
          <MyTabs />
      </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;