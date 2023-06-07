import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MoveListScreen from '../screens/MoveListScreen';
import MoveDetailScreen from '../screens/MoveDetailScreen';
import {RootStackParamList} from "./navigationTypes";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
    // TODO replace 'Move Detail' by the move name itself
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MoveList">
                <Stack.Screen name="MoveList" component={MoveListScreen} options={{title: 'Moves'}}/>
                <Stack.Screen name="MoveDetail" component={MoveDetailScreen} options={{title: 'Move Detail'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
