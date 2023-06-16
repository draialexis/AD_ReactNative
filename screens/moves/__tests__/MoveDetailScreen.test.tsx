// screens/moves/__tests__/MoveDetailScreen.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MoveDetailScreen from '../MoveDetailScreen';
import { MOVE_FORM } from "../../../navigation/constants";

const mockStore = configureStore([]);

describe('MoveDetailScreen', () => {
    let store;
    let component: JSX.Element;
    // @ts-ignore
    let navigation;

    beforeEach(() => {
        const mockMove = {
            id: '1',
            name: 'Test Move',
            category: 'PHYSICAL',
            power: '100',
            accuracy: '100',
            type: {
                name: 'NORMAL',
                weakAgainst: [],
                effectiveAgainst: [],
            },
        };

        store = mockStore({
            move: {
                moves: [mockMove],
                error: null,
            },
        });

        navigation = { navigate: jest.fn(), setOptions: jest.fn() };
        const route = { params: { move: mockMove } };

        component = (
            <Provider store={store}>
                {/* @ts-ignore */}
                <MoveDetailScreen navigation={navigation} route={route} />
            </Provider>
        );
    });

    it('renders correctly', () => {
        const { getByText } = render(component);
        expect(getByText('Name: Test Move')).toBeTruthy();
        expect(getByText('Category: PHYSICAL')).toBeTruthy();
        expect(getByText('Power: 100')).toBeTruthy();
        expect(getByText('Accuracy: 100')).toBeTruthy();
        expect(getByText('Type: NORMAL')).toBeTruthy();
    });

    it('navigates to the form screen when the edit button is pressed', () => {
        const { getByText } = render(component);
        fireEvent.press(getByText('Edit Move'));
        // @ts-ignore
        expect(navigation.navigate).toHaveBeenCalledWith(MOVE_FORM, { move: expect.any(Object) });
    });

    it('sets the navigation options correctly', () => {
        render(component);
        // @ts-ignore
        expect(navigation.setOptions).toHaveBeenCalledWith({ title: 'Test Move' });
    });
});
