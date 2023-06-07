import React from 'react';
import {render} from '@testing-library/react-native';
import TypeTacticsInfoList from './TypeTacticsInfoList';

describe('TypeTacticsInfoList component', () => {
    it('renders types correctly', () => {
        const types = ['FIRE', 'WATER', 'GRASS'];
        const {getByText} = render(<TypeTacticsInfoList isWeakness={true} types={types}/>);

        types.forEach(type => {
            expect(getByText(type)).toBeTruthy();
        });
    });

    it('renders "Nothing" when types array is empty', () => {
        const {getByText} = render(<TypeTacticsInfoList isWeakness={false} types={[]}/>);
        expect(getByText('Nothing')).toBeTruthy();
    });

    it('renders "Nothing" when types is undefined', () => {
        // @ts-ignore
        const {getByText} = render(<TypeTacticsInfoList isWeakness={true} types={undefined}/>);
        expect(getByText('Nothing')).toBeTruthy();
    });
});
