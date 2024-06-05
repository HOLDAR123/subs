import { useState, useContext, Fragment, useRef, useEffect } from "react";

import {
    TotalSumContext,
    ScrollElementContext,
    SelectValuesResourcesContext,
    NewProcessorsContext,
    ActiveTabContext,
    TabsProfileContext
} from "@/app/subsquid-cloud/context";

import style from './ApiCosts.module.scss'
import { useWindowWidth } from "@react-hook/window-size";

export default function ApiCostsResult() {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const [selectValues, _setSelectValues] = useContext(SelectValuesResourcesContext)
    const [newProcessors, _setNewProcessors] = useContext(NewProcessorsContext)
    const [activeTab, _setActiveTab] = useContext(ActiveTabContext)
    const [tabsProfile, _setTabsProfile] = useContext(TabsProfileContext)

    const totalBlockRef = useContext(ScrollElementContext)
    const resultBlockRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false);

    const windowWidth = typeof window !== undefined? useWindowWidth() : 0

    const setInfoText = () =>{
        const profile = tabsProfile[0].select
        if (activeTab === 'byUseCase') {
            if (profile === 'COLLOCATED') {
                return 'The calculated price quote is provisional. An optimal configuration may require more compute resources for use-cases serving complex API queries and/or processing high volumes of indexed data.'
            }
            else if (profile === 'DEDICATED') {
                return 'The calculated price quote is provisional. An optimal configuration may require more compute resources for use-cases serving complex API queries and/or processing high volumes of indexed data.'
            }
        }
        else if (activeTab === 'byResources') {
            if (profile === 'COLLOCATED') {
                return 'A free collocated indexer can only be deployed to the Playground. The Playground is an isolated space automatically created for each Cloud account. The deployments to the Playground are not billed.'
            }
        }
    }

    const currentTotalPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index) => {
            sum += item.currentPrice
        })
        newProcessors.state.forEach((item, _index) => {
            sum += item.price.value
        })
        return sum
    }

    const currentOldPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index) => {
            sum += item.price
        })
        newProcessors.state.forEach((item, _index) => {
            sum += item.price.value
        })
        return sum
    }

    const setDetailProcessorsInfo = () => {
        return newProcessors.state.map((item, index) => {
            return (
                <div key={index} className={style["api-costs__result__list-item"]}>
                    <div className={style["api-costs__result__list-item__wrapper"]}>
                        <div className={style["api-costs__result__list-item__wrapper_left"]}>
                            <p>{item.fieldName}</p>
                            <p className={style["api-costs__result__list-item__select"]}>
                                {item.select} {item.fieldName === 'Postgres storage' ? 'Gb' : item.fieldName === 'RPC requests' ? 'M' : ''}
                            </p>
                        </div>
                        <p>${(item.price.value * 720).toFixed(2)}/mo</p>
                    </div>
                </div>
            )
        })
    }

    const setDetailInfo = () => {
        return selectValues.map((item, index) => {
            if (!item.isActive) return;
            return (
                <Fragment key={index}>
                    <div className={style["api-costs__result__list-item"]}>
                        <div className={style["api-costs__result__list-item__wrapper"]}>
                            <div className={style["api-costs__result__list-item__wrapper_left"]}>
                                <p>{item.fieldName === 'Processor profile' ? `${item.fieldName} 1` : item.fieldName}</p>
                                <p className={style["api-costs__result__list-item__select"]}>
                                    {item.select} {item.replicas ? `x ${item.replicas} replicas` : ''} {item.fieldName === 'Postgres storage' ? 'Gb' : item.fieldName === 'RPC requests' ? 'M' : ''}
                                </p>
                            </div>
                            <p>${(totalSum[index]?.price * 720).toFixed(2)}/mo</p>
                        </div>
                    </div>
                    {(newProcessors.state.length > 0 && index === 0) && setDetailProcessorsInfo()}
                </Fragment>
            )
        })
    }

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 767);
    };

    useEffect(() => {
        handleResize(); // Проверяем размер окна при монтировании компонента

        window.addEventListener("resize", handleResize); // Добавляем обработчик события resize

        return () => {
            window.removeEventListener("resize", handleResize); // Удаляем обработчик при размонтировании компонента
        };
    }, []);


    useEffect(() => {
        if (resultBlockRef.current) {
            if (isOpen && resultBlockRef.current.parentElement) {
                resultBlockRef.current.parentElement.style.height = `${resultBlockRef.current.getBoundingClientRect().height}px`
            }
            else if (!isOpen && resultBlockRef.current.parentElement) {
                resultBlockRef.current.parentElement.style.height = '0px'
            }
        }
    }, [resultBlockRef, selectValues, newProcessors, isOpen])

    return (
        <div
            className={
                isOpen ?
                    `${style["api-costs__result"]} ${style["api-costs__result_active"]}`
                    : style["api-costs__result"]
            }
            ref={totalBlockRef}
        >
            <div className={style["api-costs__result__wrapper"]}>
                {(setInfoText() || !isSmallScreen) &&


                    <p
                        className={
                            isOpen?
                                `${style["api-costs__result__info"]} ${style["api-costs__result__info_open"]}`
                                : style["api-costs__result__info"]
                        }
                        style={{opacity: `${activeTab === 'byResources' && tabsProfile[0].select === 'DEDICATED' ? 0 : 1}`}}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1659_1643)">
                                <path d="M11.0826 2.62335L18.2776 15.085C18.3874 15.275 18.4451 15.4906 18.4451 15.71C18.4451 15.9294 18.3874 16.145 18.2777 16.335C18.1679 16.525 18.0102 16.6828 17.8201 16.7925C17.6301 16.9023 17.4146 16.96 17.1951 16.96H2.80514C2.58573 16.96 2.37017 16.9023 2.18016 16.7925C1.99014 16.6828 1.83234 16.525 1.72264 16.335C1.61293 16.145 1.55517 15.9294 1.55518 15.71C1.55518 15.4906 1.61293 15.275 1.72264 15.085L8.91764 2.62335C9.39848 1.79002 10.601 1.79002 11.0826 2.62335ZM10.0001 12.5C9.77913 12.5 9.56717 12.5878 9.41089 12.7441C9.25461 12.9004 9.16681 13.1123 9.16681 13.3334C9.16681 13.5544 9.25461 13.7663 9.41089 13.9226C9.56717 14.0789 9.77913 14.1667 10.0001 14.1667C10.2212 14.1667 10.4331 14.0789 10.5894 13.9226C10.7457 13.7663 10.8335 13.5544 10.8335 13.3334C10.8335 13.1123 10.7457 12.9004 10.5894 12.7441C10.4331 12.5878 10.2212 12.5 10.0001 12.5ZM10.0001 6.66669C9.79603 6.66671 9.59903 6.74165 9.4465 6.87728C9.29397 7.01291 9.19653 7.19981 9.17264 7.40252L9.16681 7.50002V10.8334C9.16705 11.0458 9.24838 11.25 9.39418 11.4045C9.53999 11.5589 9.73927 11.6519 9.95131 11.6643C10.1633 11.6768 10.3721 11.6078 10.535 11.4715C10.6979 11.3351 10.8026 11.1418 10.8276 10.9309L10.8335 10.8334V7.50002C10.8335 7.27901 10.7457 7.06704 10.5894 6.91076C10.4331 6.75448 10.2212 6.66669 10.0001 6.66669Z" fill="#2DABE0"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1659_1643">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                        <span>
                            {setInfoText()}
                        </span>
                    </p>
                }
                <div>
                    <p className={
                        currentTotalPrice() === 0 ?
                            `${style["api-costs__result__total"]} ${style["api-costs__result__total_free"]}`
                            : `${style["api-costs__result__total"]} ${style["api-costs__result__total_free"]} ${style["api-costs__result__total_free_disable"]}`
                    }>FREE</p>
                    <p
                        className={
                            currentTotalPrice() === 0 ?
                                `${style["api-costs__result__total"]} ${style["api-costs__result__total_month"]} ${style["api-costs__result__total_disable"]}`
                                : `${style["api-costs__result__total"]} ${style["api-costs__result__total_month"]}`
                        }
                    >
                        {`$${(currentOldPrice() * 720).toFixed(2)}/mo`}
                    </p>
                    <p
                        className={
                            currentTotalPrice() === 0 ?
                                `${style["api-costs__result__total"]} ${style["api-costs__result__total_hour"]} ${style["api-costs__result__total_disable"]}`
                                : `${style["api-costs__result__total"]} ${style["api-costs__result__total_hour"]}`
                        }
                    >
                        {`$${(currentOldPrice()).toFixed(2)}/h`}
                    </p>
                </div>
            </div>
            <button
                className={style["api-costs__result__more"]}
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>See details</p>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5.5L8 10.5L3 5.5" stroke="#EC6A3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div className={style["api-costs__result__list"]}>
                <div ref={resultBlockRef} className={style["api-costs__result__list__wrapper"]}>
                    {setDetailInfo()}
                </div>
            </div>
        </div>
    )
}
