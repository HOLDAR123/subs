import { useEffect, useRef, useState } from 'react';
import ReactSlider from 'react-slider'

import { IApiCostsRange, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from '../ApiCosts.module.scss'

type Props = {
    field: IApiCostsRange,
    updateState: (item: IApiCostsState) => void,
    isActive: boolean,
    value: string
};

export default function ApiCostsFieldRange({ field, updateState, isActive, value }: Props) {

    const [sliderValue, setSliderValue] = useState(value)

    const setValueWithSteps = (value: number) => {
        if (field.range[0] % field.step === 0) {
            return value.toString()
        }
        else if (value - field.range[0] > 0) {
            return (value - field.range[0]).toString()
        }
        else return value.toString()
    }

    useEffect(() => {
        setSliderValue(value)
    }, [value])

    return (
        <div
            className={style["api-costs__list-item__fields_range__wrapper"]}
        >
            <ReactSlider
                className={style["api-costs__list-item__fields-item-range"]}
                disabled={!isActive}
                markClassName={style["api-costs__list-item__fields-item-range-mark"]}
                min={field.range[0]}
                max={field.range[1]}
                value={Number(sliderValue)}
                step={field.step}
                thumbClassName={style["api-costs__list-item__fields-item-range-thumb"]}
                trackClassName={style["api-costs__list-item__fields-item-range-track"]}
                renderThumb={(props, _state) => {
                    return (
                        <div {...props}>

                            <div
                                className={style["api-costs__list-item__fields-item__wrapper"]}
                            >
                                <p className={style["api-costs__list-item__fields-item__prefix"]}>
                                    {Number(sliderValue) === field.range[0]?
                                        `< ${Number(sliderValue).toLocaleString()} ${field.prefix}`
                                        : Number(sliderValue) === field.range[1]?
                                            `> ${Number(sliderValue).toLocaleString()} ${field.prefix}`
                                            : `${Number(sliderValue).toLocaleString()} ${field.prefix}`
                                    }
                                </p>
                            </div>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="13.3333" fill="#EC6A3B" stroke="white" stroke-width="5.33333"/>
                            </svg>
                        </div>
                    )
                }
                }
                onChange={(val) => { setSliderValue(setValueWithSteps(val)) }}
                onAfterChange={(val) => {
                    updateState(
                        {
                            price: field.price,
                            fieldName: field.name,
                            select: setValueWithSteps(val),
                            limit: field.limit,
                            isActive: isActive
                        }
                    )
                }}
            />
        </div>
    )
}
