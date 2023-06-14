// navigation/Navigation.tsx

import React                                    from 'react';
import { createBottomTabNavigator }             from '@react-navigation/bottom-tabs';
import { NavigationContainer }                  from '@react-navigation/native';
import MoveListScreen                           from '../screens/moves/MoveListScreen';
import MoveDetailScreen                         from '../screens/moves/MoveDetailScreen';
import HomeScreen                               from '../screens/HomeScreen';
import { createStackNavigator }                 from '@react-navigation/stack';
import { RootStackParamList, RootTabParamList } from "./navigationTypes";
import { Image, StyleSheet }                    from 'react-native';
import MoveFormScreen                           from "../screens/moves/MoveFormScreen";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const MoveStack = () => {
    return (
        <Stack.Navigator initialRouteName="MoveList">
            <Stack.Screen name="MoveList" component={MoveListScreen} options={{ title: 'Moves' }}/>
            <Stack.Screen
                name="MoveDetail"
                component={MoveDetailScreen}
                options={({ route }) => ({ title: route.params.move.name })}
            />
            <Stack.Screen name="MoveForm" component={MoveFormScreen}/>
        </Stack.Navigator>
    );
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home"
                           screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    title: 'Home',
                    tabBarIcon: () => <Image source={require('../assets/home.png')}
                                             style={styles.icon}/>
                }}/>
                <Tab.Screen name="Moves" component={MoveStack} options={{
                    title: 'Moves',
                    tabBarIcon: () => <Image source={require('../assets/moves.png')}
                                             style={styles.icon}/>
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        padding: 8,
    },
});

export default Navigation;
