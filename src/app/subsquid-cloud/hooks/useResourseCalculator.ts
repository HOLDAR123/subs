import { useEffect } from 'react';
import { _apiCostsMock, IApiCostsRadio, IApiCostsState } from '@/_mock/apiCosts.mock';
import { NewProcessors, SelectValues } from '../context';

type Props = {
    selectUseCaseState: SelectValues,
    selectResourcesState: SelectValues,
    tabsProfileState: SelectValues,
    selectNewProcessors: NewProcessors
}

export const useResourseCalculator = ({ selectUseCaseState, selectResourcesState, tabsProfileState, selectNewProcessors }: Props) => {

    const [selectValuesUseCase, _setSelectValuesUseCase] = selectUseCaseState
    const [selectValuesResources, setSelectValuesResources] = selectResourcesState
    const [newProcessors, setNewProcessors] = selectNewProcessors
    const [tabsProfile, _setTabsProfile] = tabsProfileState

    let returnSelectValuesResources = selectValuesResources

    const listIndex = (fieldName: string): number => {
        const selectValuesUseCaseIndex = selectValuesUseCase.findIndex((el) => el.fieldName === fieldName)
        const selectValuesResourcesIndex = returnSelectValuesResources.findIndex((el) => el.fieldName === fieldName)
        if (selectValuesUseCaseIndex !== -1) {
            return selectValuesUseCaseIndex
        }
        else if (selectValuesResourcesIndex !== -1) {
            return selectValuesResourcesIndex
        }
        else {
            throw new Error('Check apiCosts.mock.tsx fields')
        }
    };

    const updateState = (item: IApiCostsState, listIndex: number) => {
        const updateObj = [...returnSelectValuesResources];
        updateObj[listIndex] = !item.replicas ? { ...item, replicas: returnSelectValuesResources[listIndex].replicas } : item
        returnSelectValuesResources = [...updateObj]
    };

    const currentInfo = (fieldName: string, selectValue: string | number, listIndex: number): IApiCostsState => {
        const mockField = _apiCostsMock.tabs.byResources.fields.find((el) => el.name === fieldName);
        if (!mockField) {
            throw new Error('fieldName in _apiCostsMock not found. Add fieldName in _apiCostsMock or use correct fieldName');
        }
        const select = typeof selectValue === 'string' ? selectValue : returnSelectValuesResources[listIndex].select
        const price = (): IApiCostsState["price"] => {
            const currentValue = () => {
                if (mockField?.type === 'radio') {
                    return mockField.values.find((el) => el.value === select)?.price.value ?? 0.0069
                }
                else {
                    if (Array.isArray(mockField.price.value)) {
                        if (tabsProfile[0].select === 'COLLOCATED') {
                            return mockField.price.value[0]
                        }
                        else {
                            return mockField.price.value[1]
                        }
                    }
                    else return mockField.price.value ?? 0.069
                }
            }
            return mockField?.type === 'radio'
                ? {
                    type: mockField.values.find((el) => el.value === select)?.price.type ?? 'h',
                    value: currentValue()
                }
                : {
                    type: mockField.price.type ?? 'h',
                    // value: mockField.price.value ?? 0.069
                    value: currentValue()
                };
        };

        const limit = () =>{
            if (mockField?.type === 'range' && mockField.limit) {
                return mockField.limit
            }
            else if (mockField.type === 'range-input' && mockField.limit) {
                return tabsProfile[0].select === 'COLLOCATED'? mockField.limit[0] : mockField.limit[1]
            }
        }

        return {
            ...returnSelectValuesResources[listIndex],
            select: select,
            price: price(),
            replicas: typeof selectValue === 'number' ? selectValue.toString() : returnSelectValuesResources[listIndex].replicas,
            limit: limit()
        };
    };

    const setRenderItemValues = () =>{
        if (selectTabsProfile === 'COLLOCATED') {
            return (
                [
                    {
                        title: 'Default',
                        value: 'default',
                        price: {
                            type: "h",
                            value: 0.0069
                        },
                    }
                ]
            )
        }
        else return (
            [
                {
                    title: 'Small',
                    value: 'small',
                    price: {
                        type: "h",
                        value: 0.04
                    },
                },
                {
                    title: 'Medium',
                    value: 'medium',
                    price: {
                        type: "h",
                        value: 0.08
                    },
                },
                {
                    title: 'Large',
                    value: 'large',
                    price: {
                        type: "h",
                        value: 0.15
                    },
                }
            ]
        )
    }

    const indexProcessorProfile = listIndex('Processor profile')
    const indexApiProfile = listIndex('API profile')
    const indexPostgresProfile = listIndex('Postgres profile')
    const indexPostgresStorage = listIndex('Postgres storage')
    // const indexDataSize = listIndex('dataSize')
    // const indexQueryComplexity = listIndex('queryComplexity')
    const indexNetworksCount = listIndex('networksCount')
    const indexApiReplicas = listIndex('API profile')
    const indexRequestsPerSecond = listIndex('requestsPerSecond')
    const indexRPCrequests = listIndex('RPC requests')

    const selectTabsProfile = tabsProfile[0].select

    const tabConditions = [
        {
            name: 'squidProfile',
            conditions: () => {
                if (selectTabsProfile === 'COLLOCATED') {
                    updateState(
                        currentInfo('Processor profile', 'default', indexProcessorProfile), indexProcessorProfile
                    );
                    updateState(
                        currentInfo('API profile', 'default', indexApiProfile), indexApiProfile
                    );
                    updateState(
                        currentInfo('Postgres profile', 'default', indexPostgresProfile), indexPostgresProfile
                    );
                    updateState(
                        currentInfo('Postgres storage', '10', indexPostgresStorage), indexPostgresStorage
                    );
                    updateState(
                        currentInfo('API profile', 1, indexApiReplicas), indexApiReplicas
                    );
                    updateState(
                        currentInfo('RPC requests', '0.5', indexRPCrequests), indexRPCrequests
                    );
                }
                else if (selectTabsProfile === 'DEDICATED') {
                    updateState(
                        currentInfo('RPC requests', '2', indexRPCrequests), indexRPCrequests
                    );
                }
            },
        },
        {
            name: 'networksCount',
            conditions: () => {
                const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                const newState: NewProcessors['0'] = {
                    render: [],
                    state: []
                }
                for (let index = 0; index < selectValueNetworksCount-1; index++) {
                    const renderItem: IApiCostsRadio = {
                        title: `Processor profile ${newState.state.length + 2}`,
                        name: `Processor profile ${newState.state.length + 2}`,
                        type: 'radio',
                        canActive: false,
                        values: setRenderItemValues(),
                        helper: {
                            title: `Processor profile ${newProcessors.render.length + 1}`,
                            description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
                        }
                    }
                    const renderState = {
                        fieldName: `Processor profile ${newState.state.length + 2}`,
                        price: setRenderItemValues()[0].price,
                        select: setRenderItemValues()[0].value,
                    }
                    newState.render.push(renderItem)
                    newState.state.push(renderState)
                }
                setNewProcessors({...newState})
            }
        },
        {
            name: 'Processor profile',
            conditions: () => {
                // const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                // const selectValueDataSize = selectValuesUseCase[indexDataSize].select
                // if (selectValueDataSize === 'small' || selectValueDataSize === 'not sure') {
                //     updateState(
                //         currentInfo('Processor profile', 'small', indexProcessorProfile), indexProcessorProfile
                //     );
                // }
                // else if (selectValueDataSize === 'medium') {
                //     updateState(
                //         currentInfo('Processor profile', 'medium', indexProcessorProfile), indexProcessorProfile
                //     );
                // }
                // else if (selectValueDataSize === 'large') {
                //     updateState(
                //         currentInfo('Processor profile', 'large', indexProcessorProfile), indexProcessorProfile
                //     );
                // }
                if (selectTabsProfile === 'COLLOCATED') {
                    updateState(
                        currentInfo('Processor profile', 'default', indexProcessorProfile), indexProcessorProfile
                    );
                }
                else if (selectTabsProfile === 'DEDICATED'){
                    updateState(
                        currentInfo('Processor profile', 'small', indexProcessorProfile), indexProcessorProfile
                    );
                }
            }
        },
        {
            name: 'API profile',
            conditions: () => {
                // const selectValue = selectValuesUseCase[indexQueryComplexity].select
                // if (selectValue === 'simple' || selectValue === 'not sure') {
                //     updateState(
                //         currentInfo('API profile', 'small', indexApiProfile), indexApiProfile
                //     );
                // }
                // else if (selectValue === 'medium') {
                //     updateState(
                //         currentInfo('API profile', 'medium', indexApiProfile), indexApiProfile
                //     );
                // }
                // else if (selectValue === 'complex') {
                //     updateState(
                //         currentInfo('API profile', 'large', indexApiProfile), indexApiProfile
                //     );
                // }
            }
        },
        {
            name: 'apiReplicas',
            conditions: () => {
                const selectValue = Number(selectValuesUseCase[indexRequestsPerSecond].select)
                if (selectValue >= 1 && selectValue < 1000) {
                    updateState(
                        currentInfo('API profile', 2, indexApiReplicas), indexApiReplicas
                    );
                }
                else if (selectValue >= 1000 && selectValue <= 4000) {
                    updateState(
                        currentInfo('API profile', 3, indexApiReplicas), indexApiReplicas
                    );
                }
                updateState(
                    currentInfo('API profile', 'small', indexApiReplicas), indexApiReplicas
                );
            }
        },
        {
            name: 'Postgres profile',
            conditions: () => {
                // const selectValueQueryComplexity = selectValuesUseCase[indexQueryComplexity].select
                // const selectValueNetworksCount = Number(selectValuesUseCase[indexNetworksCount].select)
                const selectValueRequestsPerSecond = Number(selectValuesUseCase[indexRequestsPerSecond].select)
                let updateStateQueryComplexity: number = 0
                let updateStateRequestsPerSecond: number = 0
                const updateValue = (number: number) =>{
                    if (number === 1){
                        return 'small'
                    }
                    else if (number === 2){
                        return 'medium'
                    }
                    else {
                        return 'large'
                    }
                }
                // if (selectValueQueryComplexity === 'simple') {
                //     updateStateQueryComplexity = 1
                // } else if (selectValueQueryComplexity === 'medium') {
                //     updateStateQueryComplexity = 2
                // } else if (selectValueQueryComplexity === 'complex') {
                //     updateStateQueryComplexity = 3
                // }
                if (selectValueRequestsPerSecond >= 1 && selectValueRequestsPerSecond < 300) {
                    updateStateRequestsPerSecond = 1
                }
                else if (selectValueRequestsPerSecond >= 300 && selectValueRequestsPerSecond < 2000) {
                    updateStateRequestsPerSecond = 2
                }
                else if (selectValueRequestsPerSecond >= 2000 && selectValueRequestsPerSecond <= 4000) {
                    updateStateRequestsPerSecond = 3
                }
                updateState(
                    currentInfo(
                        'Postgres profile', 
                        updateValue(
                            updateStateRequestsPerSecond > updateStateQueryComplexity? 
                            updateStateRequestsPerSecond 
                            :updateStateQueryComplexity
                        ), 
                        indexPostgresProfile
                    ), 
                    indexPostgresProfile
                );
            }
        },
    ]

    useEffect(() => {

        tabConditions.forEach((item, _index) => {
            if (item.name === 'squidProfile' || item.name === 'networksCount' || selectTabsProfile === 'DEDICATED') {
                item.conditions()
            }
        })
        return setSelectValuesResources([...returnSelectValuesResources])

    }, [selectValuesUseCase, tabsProfile]);

    return [];
};