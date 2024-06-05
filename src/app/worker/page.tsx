'use client'

import { useEffect } from 'react';

import style from './style.module.scss'

type Props = {};

export default function page({ }: Props) {

    useEffect(() => {
        setTimeout(() => {
            // window.open('https://subsquid.deform.cc/testnetnodeapplication/', '_blank');
            window.location.href = 'https://subsquid.deform.cc/testnetnodeapplication/';
        }, 1000);
    }, [])

    // const click = () => {
    //     setTimeout(() => {
    //         window.open('https://subsquid.deform.cc/testnetnodeapplication/', '_blank');
    //     }, 1000);
    // }

    return (
        <section className={style["worker"]}>
            <a
                href="https://subsquid.deform.cc/testnetnodeapplication/"
                // onClick={(e) => {
                //     e.preventDefault()
                //     click()
                // }
                // }
            >Redirecting</a>
        </section>
    )
}
