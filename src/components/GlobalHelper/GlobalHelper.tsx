import React, { useContext } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import { HelperContext, Helper } from "@/app/subsquid-cloud/context";

import style from './GlobalHelper.module.scss'

type Props = {
    helperObj: {
        title: string;
        description: string;
    },
    listIndex: number | 'manifest'
};

export default function GlobalHelper({ helperObj, listIndex }: Props) {

    const [helper, setHelper] = useContext(HelperContext)
    const windowWidth = useWindowWidth()

    const updateObj : Helper = {
        index: helper.index === listIndex? -1 : listIndex,
        value: {...helperObj} 
    }

    return (
        <>
            {(helperObj) && (
                <div className={style["helper"]}>
                    <span 
                        onClick={() => windowWidth < 768? setHelper({...updateObj}) : null}
                        onMouseOver={() => windowWidth > 768? setHelper({...updateObj}) : null}
                        onMouseLeave={() => windowWidth > 768? setHelper({...updateObj, index: -1}) : null}
                    >?</span>
                    {(windowWidth > 768 && helper.index === listIndex) && (
                        <div className={style["helper__block"]}>
                            <p>{helper.value?.description}</p>
                        </div>
                    )}
                </div>
            )}
            {(windowWidth < 768 && helper.index === listIndex) && (
                <div className={`${style["helper"]} ${style["helper_global"]}`}>
                    <div className={style["helper__wrapper"]}>
                        <p className={style["helper__title"]}>{helper.value?.title}</p>
                        <button onClick={()=>setHelper({index: -1})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L18 18" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className={style["helper__description"]}>{helper.value?.description}</p>
                </div>
            )}
        </>
    );
}
