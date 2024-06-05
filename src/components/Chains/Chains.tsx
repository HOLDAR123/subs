"use client"

import React from "react";
import classNames from "classnames";
import Image from "next/image";

import Arbitrum from '@/../public/chains/Arbitrum.svg';
import Avail from '@/../public/chains/Avail.svg';
import Berachain from '@/../public/chains/Berachain.svg';
import Manta_Network from '@/../public/chains/Manta_Network.svg';
import Moonbeam from '@/../public/chains/Moonbeam.svg';
import Polkadot from '@/../public/chains/Polkadot.svg';
import Polygon from '@/../public/chains/Polygon.svg';
import Solana from '@/../public/chains/Solana.svg';
import MonkeySquidBubble from '@/../public/lottie/MonkeySquidBubble.json';
import Fishes from '@/../public/lottie/Fishes.json';

import './Chains.scss';
import Lottie from "lottie-react";

type Props = {};

export default function Chains({}: Props) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const data = [
        {
            icon: '/etherm.svg',
            title: "Ethereum & EVM",
            link: "https://docs.subsquid.io/sdk/reference/processors/evm-batch/"
        },
        {
            icon: '/solana.svg',
            title: "Solana & SVM",
            link: "https://docs.subsquid.io/solana-indexing/"
        }, {
            icon: '/polkadot.svg',
            title: "Polkadot & Substrate",
            link: "https://docs.subsquid.io/sdk/reference/processors/substrate-batch/ "
        }
    ]

    return (
        <>
            <div className="chains">
                <span className="chains__fishes">
                <Lottie animationData={Fishes} className="chains__fishes__anim"/>
              </span>
                <h2 className="din">Subsquid Supports Your Chain</h2>
                <h3 className="din">150+ networks, L2s, appchains and more!</h3>
                <div className="chains__block">
                    <span className="chains__block__monkey">
                        <Lottie animationData={MonkeySquidBubble}/>
                        {/*<Image src={monkey} alt={'monkey'}/>*/}
                    </span>
                    <span className="chains__block__Arbitrum">
                        <Image src={Arbitrum} alt={'Arbitrum'}/>
                    </span>
                    <span className="chains__block__Avail">
                        <Image src={Avail} alt={'Avail'}/>
                    </span>
                    <span className="chains__block__Berachain"><Image src={Berachain} alt={'Berachain'}/></span>
                    <span className="chains__block__Manta_Network"><Image src={Manta_Network}
                                                                          alt={'Manta_Network'}/></span>
                    <span className="chains__block__Moonbeam"><Image src={Moonbeam} alt={'Moonbeam'}/></span>
                    <span className="chains__block__Polkadot"><Image src={Polkadot} alt={'Polkadot'}/></span>
                    <span className="chains__block__Polygon"><Image src={Polygon} alt={'Polygon'}/></span>
                    <span className="chains__block__Solana"><Image src={Solana} alt={'Solana'}/></span>
                </div>
                <h4 className="din">and 150+ more!</h4>
                <button className={classNames('din__button', 'din__button_orange', 'chains__button')}
                        onClick={openModal}>
                    <p>View full list of chains</p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="white" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            <div className={classNames({
                'modal': true,
                'modal--active': isModalOpen,
            })}>
                <div className="modal__content">
                    <div className="modal__content__header">
                        <div className="modal__content__header__heading">
                            Choose chain
                        </div>
                        <button className="modal__content__header__close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.75 5.25L5.25 18.75" stroke="white" strokeWidth="3"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.75 18.75L5.25 5.25" stroke="white" strokeWidth="3"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="modal__content__links">
                        {data.map((item) => (
                            <a href={item.link} target={"_blank"} className="modal__content__links__link">
                                <img className="modal__content__links__link__icon" src={item.icon} alt=""/>
                                <div className="modal__content__links__link__title">{item.title}</div>
                            </a>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div onClick={() => setIsModalOpen(false)} className={classNames({
                "banner__backdrop": true,
                "banner__backdrop--active": isModalOpen
            })}/>
        </>
    )
}
