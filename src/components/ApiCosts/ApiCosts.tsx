'use client'

import { Fragment, RefObject, useContext, useEffect, useRef, useState } from 'react';

import {
    ActiveTabContext,
    SelectValuesUseCaseContext,
    SelectValuesResourcesContext,
    TabsProfileContext,
    NewProcessorsContext,
    SelectValues
} from '@/app/subsquid-cloud/context';

import ApiCostsField from './ApiCostsField';
import ApiCostsResult from './ApiCostsResult';
import AddProcessor from './AddProcessor';

import { IApiCostsTabs, _apiCostsMock } from '@/_mock/apiCosts.mock'

import style from './ApiCosts.module.scss'
import ApiCostsFieldProcessor from './ApiCostsFields/ApiCostsFieldProcessor';
import { FadeIn, FadeInUp, FadeInUpFast } from '../Animation';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

type Props = {
    refObj: RefObject<HTMLDivElement>
}

export default function ApiCosts({ refObj }: Props) {

    const [activeTab, setActiveTab] = useContext(ActiveTabContext);
    const [tabsProfile, setTabsProfile] = useContext(TabsProfileContext);
    const [newProcessors, setNewProcessors] = useContext(NewProcessorsContext)
    const [selectValuesUseCase, setSelectValuesUseCase] = useContext(SelectValuesUseCaseContext);
    const [selectValuesResources, setSelectValuesResources] = useContext(SelectValuesResourcesContext);

    // const [isAnimated, setIsAnimated] = useState(false)

    const nodeRef = useRef<HTMLDivElement>(null)

    const setTabNames = () => {
        const objKeys = Object.entries(_apiCostsMock.tabs)
        return objKeys.map((item, index) => {
            return (
                <button
                    className={
                        activeTab === item[1].name ?
                            `${style["api-costs__tabs-item"]} ${style["api-costs__tabs-item_active"]}`
                            : style["api-costs__tabs-item"]
                    }
                    key={index}
                    onClick={() => setActiveTab(item[1].name)}
                >
                    {item[1].title}
                </button>
            );
        });
    }

    const setNewProfiles = () => {
        return newProcessors.render.map((item, index) => {
            return (
                <ApiCostsFieldProcessor
                    key={index}
                    field={item}
                    selectValuesState={[newProcessors, setNewProcessors]}
                    tabsProfile={tabsProfile[0].select}
                />
            )
        })
    }

    const setTabFields = (fieldsArray: IApiCostsTabs["fields"], tabName: string) => {
        const currentValueState: SelectValues = tabName === 'byUseCase' ? [selectValuesUseCase, setSelectValuesUseCase] : [selectValuesResources, setSelectValuesResources]
        return fieldsArray.map((item, index) => {
            if (index === 0) {
                return (
                    <Fragment key={index}>
                        <ApiCostsField
                            field={item}
                            selectValuesState={currentValueState}
                            activeTab={activeTab}
                        />
                        {/* {newProcessors.render.length > 0 && setNewProfiles()}
                        {newProcessors.render.length < 9 && (
                            <AddProcessor tabsProfile={tabsProfile[0].select} />
                        )} */}
                        {tabName === 'byResources' && (
                            <>
                                {newProcessors.render.length > 0 && setNewProfiles()}
                                {newProcessors.render.length < 9 && (
                                    <AddProcessor tabsProfile={tabsProfile[0].select} />
                                )}
                            </>
                        )}
                    </Fragment>
                )
            }
            else return (
                <ApiCostsField
                    key={index}
                    field={item}
                    selectValuesState={currentValueState}
                    activeTab={activeTab}
                />
            )
        })
    }

    const renderList = [
        <>
            <ApiCostsField
                field={_apiCostsMock.profile[0]}
                selectValuesState={[tabsProfile, setTabsProfile]}
                activeTab={activeTab}
            />
            {setTabFields(_apiCostsMock.tabs['byUseCase'].fields, 'byUseCase')}
            <ApiCostsResult />
        </>
        ,
        <>
            <ApiCostsField
                field={_apiCostsMock.profile[1]}
                selectValuesState={[tabsProfile, setTabsProfile]}
                activeTab={activeTab}
            />
            {setTabFields(_apiCostsMock.tabs['byResources'].fields, 'byResources')}
            <ApiCostsResult />
        </>
    ]

    // const fadeInEvent = (isVisible: Boolean) =>{
    //     const timeout = setTimeout(()=>{
    //         if (isVisible) {
    //             setIsAnimated(true)
    //         }
    //     }, 500)
    // }

    // useEffect(()=>{
    //     console.log('isAnimated', isAnimated)
    // }, [isAnimated])

    return (
        <section ref={refObj} className={style["api-costs"]} id={'#calculator'}>
            <FadeInUpFast delay={100}>
                <div className={style["api-costs_div"]}>
                    <h2 className="title_api-costs">Cost calculator</h2>
                    <h3 className={style["api-costs__subtitle"]}>Learn best practices for configuring your indexer (squid) in the <a href="https://docs.subsquid.io/deploy-squid/scale/" target="_blank" rel="noopener noreferrer">docs</a></h3>
                </div>
            </FadeInUpFast>
            <FadeInUpFast delay={300}>
                <div className={
                    activeTab === 'byUseCase' ?
                        `${style["api-costs__tabs"]} ${style["api-costs__tabs_left"]}`
                        : `${style["api-costs__tabs"]} ${style["api-costs__tabs_right"]}`
                }>
                    {setTabNames()}
                </div>
            </FadeInUpFast>
            <FadeIn delay={500}>
                <div className={style["api-costs__list"]}>
                    <SwitchTransition>
                        <CSSTransition
                            key={activeTab}
                            timeout={100}
                            classNames={activeTab === 'byUseCase' ? 'api-costs_left' : 'api-costs_right'}
                            nodeRef={nodeRef}
                        >
                            <div className={style["api-costs__list__wrapper"]} ref={nodeRef}>
                                {/* <ApiCostsField
                                field={_apiCostsMock.profile[activeTab === 'byUseCase' ? 0 : 1]}
                                selectValuesState={[tabsProfile, setTabsProfile]}
                                activeTab={activeTab}
                            />
                            {setTabFields(_apiCostsMock.tabs[activeTab === 'byUseCase'? 'byUseCase': 'byResources'].fields, activeTab === 'byUseCase'? 'byUseCase': 'byResources')}
                            <ApiCostsResult /> */}
                                {renderList[activeTab === 'byUseCase' ? 0 : 1]}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </FadeIn>
        </section>
    )
}
