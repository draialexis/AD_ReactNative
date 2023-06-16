// App.tsx

import React from 'react';
import Navigation from "./navigation/Navigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <Navigation/>
            </SafeAreaProvider>
        </Provider>);
}
