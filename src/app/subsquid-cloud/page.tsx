'use client'

import {useEffect, useRef, useState} from 'react';

// context
// context types
import {
    ActiveTab,
    ActiveTabContext,
    HelperContext,
    HelperState,
    NewProcessors,
    NewProcessorsContext,
    ScrollElementContext,
    SelectValues,
    SelectValuesResourcesContext,
    SelectValuesUseCaseContext,
    SumState,
    TabsProfileContext,
    TotalSumContext
} from './context'

import PayBenefits from '@/components/PayBenefits/PayBenefits';
import ApiCosts from '@/components/ApiCosts/ApiCosts';
import EstimateCost from '@/components/EstimateCost/EstimateCost';
import Charts from '@/components/Charts/Charts';
import TheMostToolkit from '@/components/TheMostToolkit/TheMostToolkit';

import {useResourseCalculator} from './hooks/useResourseCalculator';
import {useTotalCalculator} from './hooks/useTotalPrice';

import {_apiCostsMock, IApiCostsState} from '@/_mock/apiCosts.mock'

import style from './style.module.scss'
import {FadeInUpFast} from '@/components/Animation';

const setInitial = (tab: string = 'byResources', isProfile: boolean = false): IApiCostsState[] => {
    const currentFields = tab === 'byResources' ? _apiCostsMock.tabs['byResources'].fields : _apiCostsMock.tabs['byUseCase'].fields
    if (isProfile) {
        return [
            {
                fieldName: _apiCostsMock.profile[0].name,
                select: _apiCostsMock.profile[0].values[0].value,
                price: {
                    type: _apiCostsMock.profile[0].values[0].price.type,
                    value: _apiCostsMock.profile[0].values[0].price.value
                },
                replicas: _apiCostsMock.profile[0].replicas ?? undefined,
                isActive: true,
            }
        ]
    }
    return currentFields.map((item, _index): IApiCostsState => {
        switch (item.type) {
            case 'radio':
                return {
                    fieldName: item.name,
                    select: item.values[0].value,
                    price: {type: item.values[0].price.type, value: item.values[0].price.value},
                    replicas: item.replicas ?? undefined,
                    isActive: true,
                }
                break;
            case 'radio-input':
                return {
                    fieldName: item.name,
                    select: item.values[0].toString(),
                    price: {type: item.price.type, value: item.price.value},
                    replicas: item.replicas ?? undefined,
                    isActive: true,
                }
                break;
            case 'range-input':
                return {
                    fieldName: item.name,
                    select: item.range[0][0].toString(),
                    price: {type: item.price.type, value: item.price.value},
                    replicas: item.replicas ?? undefined,
                    limit: item.limit[0],
                    isActive: true,
                }
                break;
            case 'range':
                return {
                    fieldName: item.name,
                    select: item.range[0].toString(),
                    price: {type: item.price.type, value: item.price.value},
                    replicas: item.replicas ?? undefined,
                    limit: item.limit,
                    isActive: true,
                }
                break;
            default:
                throw new Error('Uncorrected field type. Update setInitial() or add field current type.')
        }
    })
}

export default function CalculatorPage() {
    const [newProcessors, setNewProcessors] = useState<NewProcessors['0']>({state: [], render: []})
    const [selectValuesUseCase, setSelectValuesUseCase] = useState(setInitial('byUseCase')) as SelectValues;
    const [selectValuesResources, setSelectValuesResources] = useState(setInitial('byResources')) as SelectValues;
    const [activeTab, setActiveTab] = useState(Object.keys(_apiCostsMock.tabs)[0]) as ActiveTab;
    const [tabsProfile, setTabsProfile] = useState(setInitial('byUseCase', true)) as SelectValues;
    const [totalSum, setTotalSum] = useState([{fieldName: '', price: 0, currentPrice: 0}]) as SumState;
    const [helper, setHelper] = useState({index: -1}) as HelperState;
    const [estimateVisible, setEstimateVisible] = useState<boolean>(false)

    const calculatorBlockRef = useRef<HTMLDivElement | null>(null)
    const totalBlockRef = useRef<HTMLDivElement | null>(null)

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useResourseCalculator({
        selectUseCaseState: [selectValuesUseCase, setSelectValuesUseCase],
        selectResourcesState: [selectValuesResources, setSelectValuesResources],
        tabsProfileState: [tabsProfile, setTabsProfile],
        selectNewProcessors: [newProcessors, setNewProcessors],
    })

    useTotalCalculator({
        selectValuesResources: selectValuesResources,
        tabsState: tabsProfile[0].select,
        setTotalSum: setTotalSum
    })


    useEffect(() => {
        // console.log('tabsProfile', tabsProfile[0].select)
        if (tabsProfile[0].select === 'COLLOCATED') {
            setSelectValuesUseCase([...setInitial('byUseCase')])
            setNewProcessors({
                render: [],
                state: []
            })
        }
    }, [tabsProfile])

    useEffect(() => {
        if (activeTab === 'byUseCase') {
            setSelectValuesUseCase([...selectValuesUseCase])
        } else if (activeTab === 'byResources') {
            setTabsProfile([...setInitial('byResources', true)])
        }
    }, [activeTab])

    const observerCallback: IntersectionObserverCallback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            setEstimateVisible(true)
        }
    };

    const observer = useRef<IntersectionObserver>(new IntersectionObserver(observerCallback));

    useEffect(() => {
        if (calculatorBlockRef?.current) {
            observer.current.observe(calculatorBlockRef.current)
        }
    }, [calculatorBlockRef?.current])

    useEffect(() => {
        if (estimateVisible === true) {
            observer.current?.disconnect()
        }
    }, [estimateVisible])

    useEffect(() => {
        const postgresProfileIndex = selectValuesResources.findIndex((el) => el.fieldName === 'Postgres profile')
        const postgresStorageIndex = selectValuesResources.findIndex((el) => el.fieldName === 'Postgres storage')
        const updateObj = [...selectValuesResources]
        if (!selectValuesResources[postgresProfileIndex].isActive) {
            updateObj[postgresStorageIndex] = {...updateObj[postgresStorageIndex], select: '0', isActive: false}
            setSelectValuesResources([...updateObj])
        }
    }, [selectValuesResources])


    const url = isHovered
        ? "https://app.subsquid.io/"
        : "https://calendly.com/d/yzj-48g-bf7/subsquid-demo?month=2023-10";


    return (
        <SelectValuesUseCaseContext.Provider value={[selectValuesUseCase, setSelectValuesUseCase]}>
            <SelectValuesResourcesContext.Provider value={[selectValuesResources, setSelectValuesResources]}>
                <NewProcessorsContext.Provider value={[newProcessors, setNewProcessors]}>
                    <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
                        <TabsProfileContext.Provider value={[tabsProfile, setTabsProfile]}>
                            <TotalSumContext.Provider value={[totalSum, setTotalSum]}>
                                <HelperContext.Provider value={[helper, setHelper]}>
                                    <ScrollElementContext.Provider value={totalBlockRef}>
                                        <div className={style['calculator']}>
                                            <div className="container">
                                                <section className={style['calculator__header']}>
                                                    <FadeInUpFast delay={100}>
                                                        <h4 className="title">Subsquid Cloud</h4>
                                                    </FadeInUpFast>
                                                    <FadeInUpFast delay={300}>
                                                        <div className="textContainerCC">
                                                            <span className="textContainerCC__heading">Precision-Engineered Hosting</span>
                                                            <span className="textContainerCC__title">For Your Blockchain Indexing Use Case</span>
                                                        </div>
                                                        <p className={style['calculator__header__subtitle']}>
                                                            <span>Join thousands of developers who use Subsquid Cloud to deploy</span><span> GraphQL APIs and sophisticated indexers for Web3 apps.</span>
                                                        </p>
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={style['calculator__header-buttons-link']}
                                                        >
                                                            <div
                                                                className={style['calculator__header-buttons']}
                                                            >
                                                                <button
                                                                    className={style['calculator__header-buttons-getStarted']}
                                                                    onMouseEnter={handleMouseEnter}
                                                                    onMouseLeave={handleMouseLeave}>
                                                                    <span
                                                                        className={style['calculator__header-buttons-img']}/>
                                                                </button>
                                                                <button
                                                                    className={style['calculator__header-buttons-bookDemo']}>
                                                                    Book demo
                                                                </button>
                                                            </div>
                                                        </a>
                                                    </FadeInUpFast>
                                                </section>
                                                <TheMostToolkit/>
                                                <Charts/>
                                                <PayBenefits/>
                                                <ApiCosts refObj={calculatorBlockRef}/>
                                                {/* <ScaleManifest /> */}
                                                <EstimateCost isVisible={estimateVisible}/>
                                            </div>
                                        </div>
                                    </ScrollElementContext.Provider>
                                </HelperContext.Provider>
                            </TotalSumContext.Provider>
                        </TabsProfileContext.Provider>
                    </ActiveTabContext.Provider>
                </NewProcessorsContext.Provider>
            </SelectValuesResourcesContext.Provider>
        </SelectValuesUseCaseContext.Provider>
    )
}
