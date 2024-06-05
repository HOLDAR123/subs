import Image from "next/image";
import React from "react";
import { Metadata } from "next";

import icon from '../../../public/assets/icon.png'
import icon_2d from '../../../public/assets/icon_2d.svg'

import style from './style.module.scss'

type Props = {};

const svgTextSubsquid = <svg width="515" height="81" viewBox="0 0 515 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M468.2 58.5119H477.475C488.464 58.5119 497.437 52.1607 497.437 37.8453C497.437 23.5298 488.464 17.0778 477.475 17.0778H468.2V58.5119ZM478.08 73.5331H452.271V2.05664H478.181C499.654 2.05664 514.071 15.7672 514.071 37.8453C514.071 59.9233 499.654 73.5331 478.08 73.5331Z" fill="currentColor"/>
<path d="M435.794 73.5331H419.664V2.05664H435.794V73.5331Z" fill="currentColor"/>
<path d="M375.391 75.1461C359.664 75.1461 347.062 65.6696 347.062 47.7249V2.05664H362.991V46.4144C362.991 55.0843 367.83 59.4192 375.391 59.4192C382.953 59.4192 387.792 55.0843 387.792 46.4144V2.05664H403.72V47.7249C403.72 65.6696 391.119 75.1461 375.391 75.1461Z" fill="currentColor"/>
<path d="M261.008 37.8438C261.008 15.1608 278.046 0.542969 298.208 0.542969C318.271 0.542969 335.308 15.1608 335.308 37.8438C335.308 47.421 332.284 55.4861 327.243 61.6356L336.014 71.2129L325.529 80.0844L316.758 70.4064C311.314 73.4308 304.862 75.0438 298.208 75.0438C278.046 75.0438 261.008 60.4259 261.008 37.8438ZM277.541 37.743C277.541 52.6633 288.228 59.3169 298.208 59.3169C300.628 59.3169 303.048 58.9137 305.467 58.1072L294.982 46.6145L305.568 37.743L316.053 49.2356C317.767 46.1104 318.775 42.3804 318.775 37.743C318.775 22.8226 308.088 16.0682 298.208 16.0682C288.228 16.0682 277.541 22.8226 277.541 37.743Z" fill="currentColor"/>
<path d="M251.995 19.5966L237.68 23.6291C237.176 20.3023 234.454 14.6568 225.784 14.6568C219.836 14.6568 216.005 18.3869 216.005 22.3186C216.005 25.7462 218.122 28.2665 223.062 29.1739L232.639 30.9885C246.249 33.5088 253.306 42.2795 253.306 52.4617C253.306 63.6519 243.93 75.0438 226.893 75.0438C207.133 75.0438 198.664 62.2405 197.656 52.1592L212.274 48.6308C212.879 55.1836 217.315 60.93 227.094 60.93C233.345 60.93 237.176 57.9056 237.176 53.4698C237.176 49.8405 234.252 47.2194 229.514 46.3121L219.735 44.4974C207.637 42.1787 200.277 34.1137 200.277 23.5283C200.277 10.0194 212.174 0.542969 225.884 0.542969C243.729 0.542969 250.483 11.2291 251.995 19.5966Z" fill="currentColor"/>
<path d="M139.568 2.05664H166.284C180.398 2.05664 188.564 10.2225 188.564 21.2111C188.564 28.5705 183.927 34.6192 178.08 36.5347C184.532 38.0469 190.782 43.9948 190.782 53.2696C190.782 64.9639 181.911 73.5331 168.401 73.5331H139.568V2.05664ZM155.094 30.6875H163.764C169.309 30.6875 172.938 27.764 172.938 22.9249C172.938 18.2875 169.813 15.2631 163.562 15.2631H155.094V30.6875ZM155.094 60.5282H165.075C171.224 60.5282 174.954 57.3022 174.954 52.1607C174.954 47.2209 171.325 43.7932 165.075 43.7932H155.094V60.5282Z" fill="currentColor"/>
<path d="M95.2997 75.1461C79.5726 75.1461 66.9707 65.6696 66.9707 47.7249V2.05664H82.8995V46.4144C82.8995 55.0843 87.7386 59.4192 95.2997 59.4192C102.861 59.4192 107.7 55.0843 107.7 46.4144V2.05664H123.629V47.7249C123.629 65.6696 111.027 75.1461 95.2997 75.1461Z" fill="currentColor"/>
<path d="M54.4291 19.5966L40.1133 23.6291C39.6093 20.3023 36.8873 14.6568 28.2172 14.6568C22.2691 14.6568 18.4382 18.3869 18.4382 22.3186C18.4382 25.7462 20.5553 28.2665 25.4952 29.1739L35.0726 30.9885C48.6826 33.5088 55.7397 42.2795 55.7397 52.4617C55.7397 63.6519 46.3639 75.0438 29.3262 75.0438C9.56644 75.0438 1.09799 62.2405 0.0898438 52.1592L14.708 48.6308C15.3129 55.1836 19.7487 60.93 29.5278 60.93C35.7783 60.93 39.6093 57.9056 39.6093 53.4698C39.6093 49.8405 36.6856 47.2194 31.9473 46.3121L22.1683 44.4974C10.0705 42.1787 2.71103 34.1137 2.71103 23.5283C2.71103 10.0194 14.6072 0.542969 28.318 0.542969C46.1622 0.542969 52.9168 11.2291 54.4291 19.5966Z" fill="currentColor"/>
</svg>


export const metadata: Metadata = {
    title: 'Press kit',
}

export default function page({ }: Props) {

    const colorsList = [
        {
            background: '#CAE1F1',
            color: '#2B2B2B'
        },
        {
            background: '#FDF1E4',
            color: '#2B2B2B'
        },
        {
            background: '#FFFFFF',
            color: '#2B2B2B'
        },
        {
            background: '#2B2B2B',
            color: '#FFF'
        },
    ]

    return (
        <div className={style['assets']}>
            <div className={`container ${style['assets__container']}`}>
                <section className={style['assets__header']}>
                    <h1 className="title">Brand assets</h1>
                    <p>Thank you for your interest in Subsquid. We have some brand guidelines to share with you. <span>Please take a moment to get acquainted with them.</span></p>
                </section>
                <section className={style['assets__sections']}>
                    <div className={`${style['assets-section']} ${style['assets-section__name']}`}>
                        <h2 className="title">Our name</h2>
                        <p>“Subsquid” is one word, spelled with a big S.</p>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__logo']}`}>
                        <h2 className="title">Our logo</h2>
                        <p>Our logo can be utilized in two distinct configurations. </p>
                        <p>Squiddie icon with company name: this is the primary version of our logo, featuring the iconic Squiddie graphic alongside our company name. It represents the full brand identity and is the preferred choice for most use cases.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_company"]}`}>
                            <Image src={icon} quality={100} unoptimized alt="subsquid"/>
                            {svgTextSubsquid}
                        </div>
                        <p>Icon only: alternatively, you can use just the Squiddie icon without the company name. This simplified version is suitable for situations where a more minimalistic or icon-based representation is required while maintaining brand recognition.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_icon"]}`}>
                            <Image src={icon} quality={100} unoptimized alt="subsquid"/>
                        </div>
                        <p>When placing our logo on a dark background, please utilize the reverse version. In this version, the text becomes white to ensure maximum visibility and legibility against the dark backdrop. This ensures our logo maintains its clarity and impact, regardless of the background color.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_reverse"]}`}>
                            <Image src={icon} quality={100} unoptimized alt="subsquid"/>
                            {svgTextSubsquid}
                        </div>
                        {/* <p>If the logo needs to be monochromatic for specific purposes, please use the black and white version.</p>
                        <div className={`${style["assets-section__logo-img"]} ${style["assets-section__logo-img_black_white"]}`}>
                            <Image src={icon_2d} quality={100} unoptimized alt="subsquid"/>
                            {svgTextSubsquid}
                        </div> */}
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__colors']}`}>
                        <h2 className="title">Our colors</h2>
                        <p>We utilize light blue, sandy, and white colors for gradients, cards, backgrounds and banners. Black, or graphite, is reserved for our primary buttons and text elements, providing contrast and emphasis in our design.</p>
                        <div className={style['assets-section__colors__list']}>
                            {colorsList.map((item, index) =>
                                <div key={index} className={style['assets-section__colors__list-item']} style={{ ...item }}>{item.background}</div>
                            )}
                        </div>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__do']}`}>
                        <h2 className="title">Please do</h2>
                        <p>Provide plenty of space around the Subsquid logo and Squiddie. Make them big, make them small, just give them the chance to breathe and not feel cluttered.</p>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__dont']}`}>
                        <h2 className="title">Please don’t</h2>
                        <ul className={style['assets-section__dont__list']}>
                            <li>Alter these files in any way.</li>
                            <li>Display these graphics in a way that implies a relationship, affiliation, or endorsement by Subsquid of your product, service, or business.</li>
                            <li>Use these graphics as part of your own product, business, or service’s name.</li>
                            <li>Combine these graphics with any other graphics without written consent from Subsquid.</li>
                        </ul>
                    </div>
                    <div className={`${style['assets-section']} ${style['assets-section__download']}`}>
                        <h2 className="title">Download</h2>
                        <p>
                            You can download <a href="/assets/assets_svg.zip" download={true}>SVG</a> or <a href="/assets/assets_png.zip" download={true}>PNG</a> files.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
