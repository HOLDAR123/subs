import { useEffect, useRef, useState } from 'react';
import ReactSlider from 'react-slider'

import { IApiCostsRangeInput, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from '../ApiCosts.module.scss'

type Props = {
    field: IApiCostsRangeInput,
    updateState: (item: IApiCostsState) => void,
    isActive: boolean,
    value: string,
    tabsProfile: string
};

export default function ApiCostsFieldRangeInput({ field, updateState, isActive, value, tabsProfile }: Props) {

    const [sliderValue, setSliderValue] = useState(value)
    const [inputActive, setInputActive] = useState(false)
    const [focuse, setFocuse] = useState(false)

    const x = useRef<any | null>(null)

    const currentField = {
        ...field,
        limit: tabsProfile === 'COLLOCATED'? field.limit[0]: field.limit[1],
        range: tabsProfile === 'COLLOCATED'? field.range[0]: field.range[1],
        step: tabsProfile === 'COLLOCATED'? field.step[0]: field.step[1],
    }

    const updateObj = (item: string): IApiCostsState => {
        return {
            price: {
                type: currentField.price.type,
                value: currentField.price.value
            },
            fieldName: currentField.name,
            select: item,
            isActive: isActive,
            limit: currentField.limit
        }
    }

    const blurHandler = () =>{
        if (Number(value) < currentField.range[0]) {
            updateState(updateObj(currentField.range[0].toString()))
        }
        else if (Number(value) > currentField.range[1]) {
            updateState(updateObj(currentField.range[1].toString()))
        }
        else {
            updateState(updateObj(sliderValue.toString()))
        }
        setFocuse(false)
        setInputActive(false)
    }

    const setStep = () => {
        if (Number(sliderValue) < currentField.step) {
            return currentField.step - Number(sliderValue)
        }
        else return currentField.step
    }

    const setValueWithSteps = (value: number) => {
        if (currentField.range[0] % currentField.step === 0) {
            return value.toString()
        }
        else if (value - currentField.range[0] > 0) {
            return (value - currentField.range[0]).toString()
        }
        else return value.toString()
    }

    useEffect(() => {
        setSliderValue(value)
    }, [tabsProfile, value])

    return (
        <div
            className={style["api-costs__list-item__fields_range__wrapper"]}
        >
            <div className={style["api-costs__list-item__fields-item__label"]}>
                {field.label}
            </div>
            <label
                className={
                    inputActive ?
                        `${style["api-costs__list-item__fields-item__wrapper"]} ${style["api-costs__list-item__fields-item__wrapper_active"]}`
                        : style["api-costs__list-item__fields-item__wrapper"]
                }
                onClick={() => setInputActive(true)}
            >
                <input
                    type="number"
                    min={0}
                    className={style["api-costs__list-item__fields-item__prefix__xy"]}
                    value={sliderValue}
                    onChange={(e) => updateState(updateObj(e.target.value.toString()))}
                    onFocus={() => { setFocuse(true) }}
                    onBlur={blurHandler}
                />
                <p className={style["api-costs__list-item__fields-item__prefix__x"]}>
                    {sliderValue} {currentField.prefix}
                </p>
            </label>

            <ReactSlider
                className={style["api-costs__list-item__fields-item-range"]}
                disabled={!isActive}
                markClassName={style["api-costs__list-item__fields-item-range-mark"]}
                min={currentField.range[0]}
                max={currentField.range[1]}
                value={Number(value)}
                step={currentField.step}
                // step={setStep()}
                thumbClassName={style["api-costs__list-item__fields-item-range-thumb"]}
                trackClassName={style["api-costs__list-item__fields-item-range-track"]}
                renderThumb={(props, _state) => {
                    x.current = props
                    return (
                        <div {...props}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="13.3333" fill="#EC6A3B" stroke="white" stroke-width="5.33333"/>
                            </svg>
                        </div>
                    )
                }
                }
                onChange={(val) => { setSliderValue(setValueWithSteps(val)) }}
                // onChange={(val) => { setSliderValue(currentField.step % val === 0? val.toString(): ) }}
                onAfterChange={(val) => {
                    updateState(
                        {
                            price: currentField.price,
                            fieldName: currentField.name,
                            select: setValueWithSteps(val),
                            // select: val.toString(),
                            limit: currentField.limit,
                            isActive: isActive
                        }
                    )
                }}
            />
        </div>
    )
}
