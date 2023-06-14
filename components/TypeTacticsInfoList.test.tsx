// components/TypeTacticsInfoList.test.ts

import React               from 'react';
import { render }          from '@testing-library/react-native';
import TypeTacticsInfoList from './TypeTacticsInfoList';
import { TypeName }        from "../entities/TypeName";

describe('TypeTacticsInfoList component', () => {
    it('renders types correctly', () => {
        const types = [TypeName.FIRE, TypeName.WATER, TypeName.GRASS];
        const { getByText } = render(<TypeTacticsInfoList isWeakness={true} types={types}/>);

        types.forEach(type => {
            expect(getByText(type)).toBeTruthy();
        });
    });

    it('renders "Nothing" when types array is empty', () => {
        const { getByText } = render(<TypeTacticsInfoList isWeakness={false} types={[]}/>);
        expect(getByText('Nothing')).toBeTruthy();
    });

    it('renders "Nothing" when types is undefined', () => {
        // @ts-ignore
        const { getByText } = render(<TypeTacticsInfoList isWeakness={true} types={undefined}/>);
        expect(getByText('Nothing')).toBeTruthy();
    });
});
