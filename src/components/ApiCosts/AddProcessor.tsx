import React, { useContext, useEffect, useRef } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import useMousePosition from "@/hooks/useMousePosition";

import { NewProcessorsContext } from "@/app/subsquid-cloud/context";

import { IApiCostsRadio } from "@/_mock/apiCosts.mock";

import style from './AddProcessor.module.scss'

type Props = {
    tabsProfile: string
};

export default function AddProcessor({ tabsProfile }: Props) {

    const [newProcessors, setNewProcessors] = useContext(NewProcessorsContext)

    const windowWidth = useWindowWidth()

    const blockRef = useRef<HTMLDivElement>(null)

    const cursorPosition = useMousePosition(blockRef)

    const setRenderItemValues = () =>{
        if (tabsProfile === 'COLLOCATED') {
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

    const renderItem: IApiCostsRadio = {
        title: `Processor profile ${newProcessors.state.length + 2}`,
        name: `Processor profile ${newProcessors.state.length + 2}`,
        type: 'radio',
        canActive: false,
        values: setRenderItemValues(),
        helper: {
            title: `Processor profile ${newProcessors.render.length + 1}`,
            description: 'RPC is used to index fresh blocks in real-time. The number of RPC requests roughly corresponds to the number of blocks produced by the chain within a month.'
        }
    }

    const renderState = {
        fieldName: `Processor profile ${newProcessors.state.length + 2}`,
        price: setRenderItemValues()[0].price,
        select: setRenderItemValues()[0].value,
    }

    const pushProcessor = () => {
        if (newProcessors.render.length < 9) {
            const newState = newProcessors
            newState.render.push(renderItem)
            newState.state.push(renderState)
            setNewProcessors({...newState})
        }
    }

    // console.log(cursorPosition, {top: `${cursorPosition.y + 25}px`, left: `${cursorPosition.x - 40}px`})

    return (
        <>
            <div
                ref={blockRef}
                onClick={pushProcessor}
                className={
                    newProcessors.render.length < 10?
                    style["add"]
                    :`${style["add"]} ${style["add_disable"]}`
                }
            >
                <div className={style["add__wrapper"]}>
                    <p>Add processor</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3.33203V12.6654" stroke="#EC6A3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.33203 8H12.6654" stroke="#EC6A3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {(newProcessors.render.length > 0 && newProcessors.render.length % 2 !== 0 && windowWidth >= 768) && (
                <div style={{opacity: 0, pointerEvents: 'none'}}></div>
            )}
        </>
    )
}
