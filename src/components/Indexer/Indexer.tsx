'use client'

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {indexerData} from '@/_mock/indexer.mock';
import style from './Indexer.module.scss'
import IndexingCard, {IndexingCardProps} from "@/components/IndexingCard/IndexingCard";
import Lottie from "lottie-react";
import MonkeyWithoutSubsquid from "../../../public/lottie/MonkeyWithoutSubsquid.json";
import MonkeyWithSubsquid from "../../../public/lottie/MonkeyWithSubsquid.json";

type Props = {};

export default function Indexer({}: Props) {

    const [activeMode, setActiveMode] = useState<'Without' | 'With'>('With')
    const [activeTab] = useState<number>(0)
    const [widthActiveMode, setWidthActiveMode] = useState<number>(155)
    const [oldWidthActiveMode, setOldWidthActiveMode] = useState<number>(182)

    const blockRef = useRef<HTMLDivElement>(null)
    const spanRadioRef = useRef<HTMLSpanElement>(null)

    const buttonWithoutRef = useRef<HTMLButtonElement>(null)
    const buttonWithRef = useRef<HTMLButtonElement>(null)

    const setHeader = () => {
        const title = activeMode === 'With' ? indexerData.header[activeTab].with.title : indexerData.header[activeTab].without.title
        const subtitle = activeMode === 'With' ? indexerData.header[activeTab].with.subtitle : indexerData.header[activeTab].without.subtitle

        return (
            <>
                <h2>{title}</h2>
                <p className={classNames('subtitle', style.indexer__header__subtitle)}>{subtitle}</p>
            </>
        )
    }

    const swiper0Ref = useRef<SwiperRef>(null)
    const swiper1Ref = useRef<SwiperRef>(null)

    const tabs: Array<Array<IndexingCardProps>> = [
        [
            {
                data: {
                    arrowReversed: false,
                    title: "Indexing",
                    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M8 4.00003C6.93913 4.00003 5.92172 4.42146 5.17157 5.17161C4.42143 5.92175 4 6.93917 4 8.00003C4 9.0609 4.42143 10.0783 5.17157 10.8285C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8285C11.5786 10.0783 12 9.0609 12 8.00003C12 6.93917 11.5786 5.92175 10.8284 5.17161C10.0783 4.42146 9.06087 4.00003 8 4.00003ZM2 8.00003C1.99988 7.05574 2.22264 6.12475 2.65017 5.28278C3.0777 4.4408 3.69792 3.71163 4.4604 3.15456C5.22287 2.59749 6.10606 2.22825 7.03815 2.07687C7.97023 1.92549 8.92488 1.99625 9.82446 2.28338C10.724 2.57052 11.5432 3.06594 12.2152 3.72933C12.8872 4.39272 13.3931 5.20537 13.6919 6.10117C13.9906 6.99697 14.0737 7.95063 13.9343 8.88459C13.795 9.81855 13.4372 10.7064 12.89 11.476L17.707 16.293C17.8892 16.4816 17.99 16.7342 17.9877 16.9964C17.9854 17.2586 17.8802 17.5094 17.6948 17.6949C17.5094 17.8803 17.2586 17.9854 16.9964 17.9877C16.7342 17.99 16.4816 17.8892 16.293 17.707L11.477 12.891C10.5794 13.5293 9.52335 13.9082 8.42468 13.9862C7.326 14.0641 6.22707 13.8381 5.2483 13.333C4.26953 12.8279 3.44869 12.0631 2.87572 11.1224C2.30276 10.1817 1.99979 9.10147 2 8.00003Z"
                              fill="currentColor"/>
                    </svg>,
                    subtitle: "Blazing fast up to 150k blocks/s",
                    body: {
                        title: "Subsquid Network",
                        node: <img src="/squid_card.svg" alt=""/>
                    },
                    items: {
                        title: "Indexer",
                        cardsLeft: true,
                        cards: [
                            {
                                title: "Squid SDK", image: "/indexer_items-1.svg"
                            },
                            {
                                title: "Subgraph SDK", image: "/indexer_items-2.svg"
                            },
                            {
                                title: "DipDup SDK", image: "/indexer_items-3.svg"
                            }
                        ]
                    },
                }
            },
            {
                data: {
                    arrowReversed: false,
                    title: "Decentralized Analytics",
                    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M11.9994 7C11.7342 7 11.4799 6.89464 11.2923 6.70711C11.1048 6.51957 10.9994 6.26522 10.9994 6C10.9994 5.73478 11.1048 5.48043 11.2923 5.29289C11.4799 5.10536 11.7342 5 11.9994 5H16.9994C17.2646 5 17.519 5.10536 17.7065 5.29289C17.8941 5.48043 17.9994 5.73478 17.9994 6V11C17.9994 11.2652 17.8941 11.5196 17.7065 11.7071C17.519 11.8946 17.2646 12 16.9994 12C16.7342 12 16.4799 11.8946 16.2923 11.7071C16.1048 11.5196 15.9994 11.2652 15.9994 11V8.414L11.7064 12.707C11.5189 12.8945 11.2646 12.9998 10.9994 12.9998C10.7343 12.9998 10.48 12.8945 10.2924 12.707L7.99943 10.414L3.70643 14.707C3.51783 14.8892 3.26523 14.99 3.00303 14.9877C2.74083 14.9854 2.49002 14.8802 2.30461 14.6948C2.1192 14.5094 2.01403 14.2586 2.01176 13.9964C2.00948 13.7342 2.11027 13.4816 2.29243 13.293L7.29243 8.293C7.47996 8.10553 7.73427 8.00021 7.99943 8.00021C8.2646 8.00021 8.5189 8.10553 8.70643 8.293L10.9994 10.586L14.5854 7H11.9994Z"
                              fill="currentColor"/>
                    </svg>,
                    subtitle: "Permissionless & Open",
                    body: {
                        title: "Subsquid Network",
                        node: <img src="/squid_card.svg" alt=""/>
                    },
                    items: {
                        title: "Analytics",
                        cardsLeft: true,
                        cards: [
                            {
                                title: "CSV", image: "/indexer_items-4.svg"
                            },
                            {
                                title: "Athena", image: "/indexer_items-5.svg"
                            },
                            {
                                title: "BigQuery", image: "/indexer_items-6.svg"
                            },
                            {
                                title: "SQL", image: "/indexer_items-7.svg"
                            }
                        ]
                    },
                }
            },
            {
                data: {
                    arrowReversed: true,
                    title: "Data Availability",
                    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M5.53899 4.33001C4.4078 4.94702 3.95964 5.66246 3.95964 6.25008C3.95964 6.8377 4.4078 7.55314 5.53899 8.17015C6.63866 8.76998 8.21478 9.16675 10.0013 9.16675C11.7878 9.16675 13.3639 8.76998 14.4636 8.17015C15.5948 7.55314 16.043 6.8377 16.043 6.25008C16.043 5.66246 15.5948 4.94702 14.4636 4.33001C13.3639 3.73019 11.7878 3.33341 10.0013 3.33341C8.21478 3.33341 6.63866 3.73019 5.53899 4.33001ZM4.7409 2.86685C6.12948 2.10944 7.99087 1.66675 10.0013 1.66675C12.0117 1.66675 13.8731 2.10944 15.2617 2.86685C16.6188 3.60707 17.7096 4.76664 17.7096 6.25008C17.7096 7.73353 16.6188 8.89309 15.2617 9.63331C13.8731 10.3907 12.0117 10.8334 10.0013 10.8334C7.99087 10.8334 6.12948 10.3907 4.7409 9.63331C3.38383 8.89309 2.29297 7.73353 2.29297 6.25008C2.29297 4.76664 3.38383 3.60707 4.7409 2.86685Z"
                              fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3.1263 5.41675C3.58654 5.41675 3.95964 5.78984 3.95964 6.25008V10.0001C3.95964 10.5873 4.40774 11.3027 5.53906 11.9199C6.63877 12.5198 8.21489 12.9167 10.0013 12.9167C11.7877 12.9167 13.3638 12.5198 14.4635 11.9199C15.5949 11.3027 16.043 10.5873 16.043 10.0001V6.25008C16.043 5.78984 16.4161 5.41675 16.8763 5.41675C17.3365 5.41675 17.7096 5.78984 17.7096 6.25008V10.0001C17.7096 11.4832 16.6187 12.6427 15.2617 13.383C13.8731 14.1405 12.0118 14.5834 10.0013 14.5834C7.99084 14.5834 6.12946 14.1405 4.74089 13.383C3.38393 12.6427 2.29297 11.4832 2.29297 10.0001V6.25008C2.29297 5.78984 2.66606 5.41675 3.1263 5.41675Z"
                              fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3.1263 9.16675C3.58654 9.16675 3.95964 9.53984 3.95964 10.0001V13.7501C3.95964 14.3373 4.40774 15.0527 5.53906 15.6699C6.63877 16.2698 8.21489 16.6667 10.0013 16.6667C11.7877 16.6667 13.3638 16.2698 14.4635 15.6699C15.5949 15.0527 16.043 14.3373 16.043 13.7501V10.0001C16.043 9.53984 16.4161 9.16675 16.8763 9.16675C17.3365 9.16675 17.7096 9.53984 17.7096 10.0001V13.7501C17.7096 15.2332 16.6187 16.3927 15.2617 17.133C13.8731 17.8905 12.0118 18.3334 10.0013 18.3334C7.99084 18.3334 6.12946 17.8905 4.74089 17.133C3.38393 16.3927 2.29297 15.2332 2.29297 13.7501V10.0001C2.29297 9.53984 2.66606 9.16675 3.1263 9.16675Z"
                              fill="currentColor"/>
                    </svg>,
                    subtitle: "All Historical Data",
                    body: {
                        title: "Subsquid Network",
                        node: <img src="/squid_card.svg" alt=""/>
                    },
                    items: {
                        title: "DA layer",
                        cardsLeft: true,
                        cards: [
                            {
                                title: "Celestia", image: "/indexer_items-8.svg"
                            },
                            {
                                title: "Eigenlayer", image: "/eigenlayer.svg"
                            },
                            {
                                title: "Avail", image: "/avail.svg"
                            }
                        ]
                    },
                }
            }
        ],
        [
            {
                data: {
                    arrowReversed: false,
                    title: "Indexing",
                    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M8 4.00003C6.93913 4.00003 5.92172 4.42146 5.17157 5.17161C4.42143 5.92175 4 6.93917 4 8.00003C4 9.0609 4.42143 10.0783 5.17157 10.8285C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8285C11.5786 10.0783 12 9.0609 12 8.00003C12 6.93917 11.5786 5.92175 10.8284 5.17161C10.0783 4.42146 9.06087 4.00003 8 4.00003ZM2 8.00003C1.99988 7.05574 2.22264 6.12475 2.65017 5.28278C3.0777 4.4408 3.69792 3.71163 4.4604 3.15456C5.22287 2.59749 6.10606 2.22825 7.03815 2.07687C7.97023 1.92549 8.92488 1.99625 9.82446 2.28338C10.724 2.57052 11.5432 3.06594 12.2152 3.72933C12.8872 4.39272 13.3931 5.20537 13.6919 6.10117C13.9906 6.99697 14.0737 7.95063 13.9343 8.88459C13.795 9.81855 13.4372 10.7064 12.89 11.476L17.707 16.293C17.8892 16.4816 17.99 16.7342 17.9877 16.9964C17.9854 17.2586 17.8802 17.5094 17.6948 17.6949C17.5094 17.8803 17.2586 17.9854 16.9964 17.9877C16.7342 17.99 16.4816 17.8892 16.293 17.707L11.477 12.891C10.5794 13.5293 9.52335 13.9082 8.42468 13.9862C7.326 14.0641 6.22707 13.8381 5.2483 13.333C4.26953 12.8279 3.44869 12.0631 2.87572 11.1224C2.30276 10.1817 1.99979 9.10147 2 8.00003Z"
                              fill="currentColor"/>
                    </svg>,
                    subtitle: "Up to Days / Weeks",
                    body: {
                        title: "RPC",
                        cardsColumn: true,
                        cards: [
                            {
                                title: "QuickNode", image: "/indexer_items-9.svg"
                            },
                            {
                                title: "Alchemy", image: "/indexer_items-10.svg"
                            }
                        ]
                    },
                    items: {
                        title: "Indexer",
                        cardsColumn: true,
                        cardsLeft: true,
                        cards: [
                            {
                                title: "Squid SDK", image: "/indexer_items-1.svg"
                            },
                            {
                                title: "Subgraph SDK", image: "/indexer_items-2.svg"
                            }
                        ]
                    },
                }
            },
            {
                data: {
                    arrowReversed: false,
                    title: "Decentralized Analytics",
                    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M11.9994 7C11.7342 7 11.4799 6.89464 11.2923 6.70711C11.1048 6.51957 10.9994 6.26522 10.9994 6C10.9994 5.73478 11.1048 5.48043 11.2923 5.29289C11.4799 5.10536 11.7342 5 11.9994 5H16.9994C17.2646 5 17.519 5.10536 17.7065 5.29289C17.8941 5.48043 17.9994 5.73478 17.9994 6V11C17.9994 11.2652 17.8941 11.5196 17.7065 11.7071C17.519 11.8946 17.2646 12 16.9994 12C16.7342 12 16.4799 11.8946 16.2923 11.7071C16.1048 11.5196 15.9994 11.2652 15.9994 11V8.414L11.7064 12.707C11.5189 12.8945 11.2646 12.9998 10.9994 12.9998C10.7343 12.9998 10.48 12.8945 10.2924 12.707L7.99943 10.414L3.70643 14.707C3.51783 14.8892 3.26523 14.99 3.00303 14.9877C2.74083 14.9854 2.49002 14.8802 2.30461 14.6948C2.1192 14.5094 2.01403 14.2586 2.01176 13.9964C2.00948 13.7342 2.11027 13.4816 2.29243 13.293L7.29243 8.293C7.47996 8.10553 7.73427 8.00021 7.99943 8.00021C8.2646 8.00021 8.5189 8.10553 8.70643 8.293L10.9994 10.586L14.5854 7H11.9994Z"
                              fill="currentColor"/>
                    </svg>,
                    subtitle: "Closed Gatekeeped",
                    body: {
                        title: "Centralized Service",
                        cardsColumn: true,
                        cards: [
                            {
                                title: "Dune Analytics", image: "/indexer_items-11.svg"
                            },
                            {
                                title: "Flipside", image: "/indexer_items-12.svg"
                            },
                        ]
                    },
                    items: {
                        title: "Analytics",
                        cardsLeft: true,
                        cards: [
                            {
                                title: "CSV", image: "/indexer_items-4.svg"
                            },
                            {
                                title: "Athena", image: "/indexer_items-5.svg"
                            },
                            {
                                title: "BigQuery", image: "/indexer_items-6.svg"
                            },
                            {
                                title: "SQL", image: "/indexer_items-7.svg"
                            }
                        ]
                    },
                }
            },
            {
                data: {
                    arrowReversed: true,
                    title: "Data Availability",
                    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M5.53899 4.33001C4.4078 4.94702 3.95964 5.66246 3.95964 6.25008C3.95964 6.8377 4.4078 7.55314 5.53899 8.17015C6.63866 8.76998 8.21478 9.16675 10.0013 9.16675C11.7878 9.16675 13.3639 8.76998 14.4636 8.17015C15.5948 7.55314 16.043 6.8377 16.043 6.25008C16.043 5.66246 15.5948 4.94702 14.4636 4.33001C13.3639 3.73019 11.7878 3.33341 10.0013 3.33341C8.21478 3.33341 6.63866 3.73019 5.53899 4.33001ZM4.7409 2.86685C6.12948 2.10944 7.99087 1.66675 10.0013 1.66675C12.0117 1.66675 13.8731 2.10944 15.2617 2.86685C16.6188 3.60707 17.7096 4.76664 17.7096 6.25008C17.7096 7.73353 16.6188 8.89309 15.2617 9.63331C13.8731 10.3907 12.0117 10.8334 10.0013 10.8334C7.99087 10.8334 6.12948 10.3907 4.7409 9.63331C3.38383 8.89309 2.29297 7.73353 2.29297 6.25008C2.29297 4.76664 3.38383 3.60707 4.7409 2.86685Z"
                              fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3.1263 5.41675C3.58654 5.41675 3.95964 5.78984 3.95964 6.25008V10.0001C3.95964 10.5873 4.40774 11.3027 5.53906 11.9199C6.63877 12.5198 8.21489 12.9167 10.0013 12.9167C11.7877 12.9167 13.3638 12.5198 14.4635 11.9199C15.5949 11.3027 16.043 10.5873 16.043 10.0001V6.25008C16.043 5.78984 16.4161 5.41675 16.8763 5.41675C17.3365 5.41675 17.7096 5.78984 17.7096 6.25008V10.0001C17.7096 11.4832 16.6187 12.6427 15.2617 13.383C13.8731 14.1405 12.0118 14.5834 10.0013 14.5834C7.99084 14.5834 6.12946 14.1405 4.74089 13.383C3.38393 12.6427 2.29297 11.4832 2.29297 10.0001V6.25008C2.29297 5.78984 2.66606 5.41675 3.1263 5.41675Z"
                              fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3.1263 9.16675C3.58654 9.16675 3.95964 9.53984 3.95964 10.0001V13.7501C3.95964 14.3373 4.40774 15.0527 5.53906 15.6699C6.63877 16.2698 8.21489 16.6667 10.0013 16.6667C11.7877 16.6667 13.3638 16.2698 14.4635 15.6699C15.5949 15.0527 16.043 14.3373 16.043 13.7501V10.0001C16.043 9.53984 16.4161 9.16675 16.8763 9.16675C17.3365 9.16675 17.7096 9.53984 17.7096 10.0001V13.7501C17.7096 15.2332 16.6187 16.3927 15.2617 17.133C13.8731 17.8905 12.0118 18.3334 10.0013 18.3334C7.99084 18.3334 6.12946 17.8905 4.74089 17.133C3.38393 16.3927 2.29297 15.2332 2.29297 13.7501V10.0001C2.29297 9.53984 2.66606 9.16675 3.1263 9.16675Z"
                              fill="currentColor"/>
                    </svg>,
                    subtitle: "No Historical Data",
                    body: {
                        title: "No Solution",
                        node: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z"
                                stroke="white" strokeWidth="3" strokeLinecap="round"
                                strokeLinejoin="round"/>
                            <path d="M15.5781 15.5781L24.4219 24.4219" stroke="white"
                                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    },
                    items: {
                        title: "DA layer",
                        cardsLeft: true,
                        cards: [
                            {
                                title: "Celestia", image: "/indexer_items-8.svg"
                            },
                            {
                                title: "Eigenlayer", image: "/eigenlayer.svg"
                            },
                            {
                                title: "Avail", image: "/avail.svg"
                            }
                        ]
                    },
                }
            }
        ]
    ]

    const [tab0Index, setTab0Index] = useState<number>(0)
    const [tab1Index, setTab1Index] = useState<number>(0)

    useEffect(() => {
        if (spanRadioRef.current) {
            spanRadioRef.current.style.width = `${widthActiveMode}px`

            if (activeMode === "Without") {
                spanRadioRef.current.style.transform = `translate(-1px)`
            } else {
                spanRadioRef.current.style.transform = `translate(${oldWidthActiveMode + 2}px)`
            }
        }
    }, [widthActiveMode])

    useLayoutEffect(() => {
        if (buttonWithRef.current && buttonWithoutRef.current) {
            setOldWidthActiveMode(buttonWithoutRef.current.getBoundingClientRect().width)
            setWidthActiveMode(buttonWithRef.current.getBoundingClientRect().width)
        }
    }, [buttonWithoutRef.current, buttonWithRef.current])


    return (
        <div className={style.indexer}>
            <div className={classNames(style.indexer__container, 'container')}>
                <div className={style.indexer__header}>
                    {setHeader()}
                </div>
                <div
                    className={classNames(style.indexer__radio, activeMode === 'Without' ? style.indexer__radio_left : style.indexer__radio_right)}>
                    <span className={style.indexer__radio__span} ref={spanRadioRef}></span>
                    <button
                        ref={buttonWithoutRef}
                        className={classNames(style.indexer__radio__button, activeMode === 'Without' && style.indexer__radio__button_active)}
                        onClick={(e) => {
                            setActiveMode('Without')
                            setOldWidthActiveMode(widthActiveMode)
                            setWidthActiveMode(e.currentTarget.getBoundingClientRect().width)
                        }}
                    >Without Subsquid
                    </button>
                    <button
                        ref={buttonWithRef}
                        className={classNames(style.indexer__radio__button, activeMode === 'With' && style.indexer__radio__button_active)}
                        onClick={(e) => {
                            setActiveMode('With')
                            setOldWidthActiveMode(widthActiveMode)
                            setWidthActiveMode(e.currentTarget.getBoundingClientRect().width)
                        }}
                    >With Subsquid
                    </button>
                </div>
                <div className={style.indexer__wrapper}>
                    <Lottie className={classNames({
                        [style.indexer__background]: true,
                        [style.indexer__background_with]: activeMode === 'With',
                        [style.indexer__background_without]: activeMode === 'Without'
                    })} animationData={activeMode === 'With' ? MonkeyWithSubsquid : MonkeyWithoutSubsquid} alt=""/>
                    <div className={style.indexer__block} ref={blockRef}>
                        <div className={style.indexer__block__wrapper}>
                            <div className={classNames({
                                [style.indexer__item]: true,
                                [style.indexer__item_active]: activeMode === 'With'
                            })}>
                                <div className={classNames({
                                    [style.indexer__tabs]: true
                                })}>
                                    {tabs[0].map((tab, index) => (
                                        <button onClick={() => {
                                            if (swiper0Ref.current) {
                                                swiper0Ref.current.swiper.slideTo(index)
                                            }
                                        }} className={classNames({
                                            [style.indexer__tab]: true,
                                            [style.indexer__tab_active]: tab0Index === index,
                                        })}>
                                            {tab.data.icon}
                                            <p>{tab.data.title}</p>
                                        </button>
                                    ))}
                                </div>
                                <Swiper className={style.indexer__swiper}
                                        ref={swiper0Ref}
                                        onSlideChange={(s) => {
                                            setTab0Index(s.activeIndex)
                                        }}
                                        speed={500}
                                        slidesPerView={3}
                                        slidesPerGroup={3}
                                        spaceBetween={40}
                                        breakpoints={{
                                            0: {
                                                spaceBetween: 40,
                                                slidesPerGroup: 1,
                                                slidesPerView: 1,
                                                allowTouchMove: true
                                            },
                                            1000: {
                                                spaceBetween: 40,
                                                slidesPerGroup: 3,
                                                slidesPerView: 3,
                                                allowTouchMove: false
                                            }
                                        }}
                                >
                                    {tabs[0].map((tab) => <SwiperSlide>
                                        <IndexingCard data={tab.data}/>
                                    </SwiperSlide>)}
                                </Swiper>
                            </div>
                            <div className={classNames({
                                [style.indexer__item]: true,
                                [style.indexer__item_active]: activeMode === 'Without'
                            })}>
                                <div className={classNames({
                                    [style.indexer__tabs]: true
                                })}>
                                    {tabs[0].map((tab, index) => (
                                        <button className={classNames({
                                            [style.indexer__tab]: true,
                                            [style.indexer__tab_active]: tab1Index === index,
                                        })} onClick={() => {
                                            if (swiper1Ref.current) {
                                                swiper1Ref.current.swiper.slideTo(index)
                                            }
                                        }}>
                                            {tab.data.icon}
                                            <p>{tab.data.title}</p>
                                        </button>
                                    ))}
                                </div>
                                <Swiper className={style.indexer__swiper}
                                        ref={swiper1Ref}
                                        speed={500}
                                        slidesPerView={3}
                                        slidesPerGroup={3}
                                        spaceBetween={40}
                                        onSlideChange={(s) => {
                                            setTab1Index(s.activeIndex)
                                        }}
                                        breakpoints={{
                                            0: {
                                                spaceBetween: 40,
                                                slidesPerGroup: 1,
                                                slidesPerView: 1,
                                                allowTouchMove: true
                                            },
                                            1000: {
                                                spaceBetween: 40,
                                                slidesPerGroup: 3,
                                                slidesPerView: 3,
                                                allowTouchMove: false
                                            }
                                        }}
                                >
                                    {tabs[1].map((tab) => <SwiperSlide>
                                        <IndexingCard data={tab.data}/>
                                    </SwiperSlide>)}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
