import React from 'react';
import {render} from '@testing-library/react-native';
import Greeting from './Greeting';

describe('Greeting component', () => {
    it('renders Hello, World! text', () => {
        const {getByText} = render(<Greeting/>);
        expect(getByText('Hello, World!')).toBeTruthy();
    });
});
