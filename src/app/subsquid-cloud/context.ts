import { Dispatch, SetStateAction, createContext, MutableRefObject } from "react";

import { IApiCostsRadio, IApiCostsState } from '@/_mock/apiCosts.mock'

export type ActiveTab = [string, Dispatch<SetStateAction<string>>]
export type SelectValues = [IApiCostsState[], Dispatch<SetStateAction<IApiCostsState[]>>]
export type SumState = [Sum[], Dispatch<SetStateAction<Sum[]>>]
export type HelperState = [Helper, Dispatch<SetStateAction<Helper>>]
export type NewProcessors = [Processors, Dispatch<SetStateAction<Processors>>]

type Processors = {
    state: (IApiCostsState)[],
    render: (IApiCostsRadio)[],
}

export type Sum = {
    fieldName: string,
    price: number,
    currentPrice: number,
}

export type Helper = {
    index: number | 'manifest',
    value?: {
        title: string,
        description: string,
    }
}

const initialSelectValues: IApiCostsState[] = [
    {
        fieldName: '',
        select: '',
        price: {
            type: '',
            value: 0
        },
        isActive: true,
    }
]

export const ActiveTabContext = createContext<ActiveTab>(['', () => { }]);
export const TabsProfileContext = createContext<SelectValues>([initialSelectValues, () => { }]);
export const SelectValuesUseCaseContext = createContext<SelectValues>([initialSelectValues, () => { }]);
export const SelectValuesResourcesContext = createContext<SelectValues>([initialSelectValues, () => { }]);
export const NewProcessorsContext = createContext<NewProcessors>([{state: [], render: []}, () => { }]);
export const TotalSumContext = createContext<SumState>([[{fieldName: '', price: 0, currentPrice: 0}], () => { }]);
export const HelperContext = createContext<HelperState>([{index:-1}, () => { }]);
export const ScrollElementContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null);