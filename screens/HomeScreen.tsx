// screens/HomeScreen.tsx

import React           from 'react';
import { Image, View } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/logo.png')} style={{ width: 500, height: 500 }}/>
        </View>
    );
};

export default HomeScreen;
