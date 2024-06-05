'use client';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Inter } from 'next/font/google';

import GlobalHelper from '../GlobalHelper/GlobalHelper';

import { SelectValuesResourcesContext, TabsProfileContext, NewProcessorsContext } from '@/app/subsquid-cloud/context';

import style from './ScaleManifest.module.scss';
import { IApiCostsState } from '@/_mock/apiCosts.mock';
import { FadeInUp, FadeInUpFast } from '../Animation';

const inter = Inter({ subsets: ['latin'] })

export default function ScaleManifest() {

    const [selectValuesResources, _setSelectValuesResources] = useContext(SelectValuesResourcesContext)
    const [newProcessors, _setNewProcessors] = useContext(NewProcessorsContext)
    const [tabsProfile, _setTabsProfile] = useContext(TabsProfileContext)

    const [isCopied, setIsCopied] = useState(false)
    const [isHover, setIsHover] = useState(false)

    const selectItem = (array: IApiCostsState[], name: string) => {
        return array[array.findIndex((el) => el.fieldName === name)]
    }

    const setNewProcessors = () => {
        const returnArray = [
            {
                name: `${selectItem(selectValuesResources, 'Processor profile').fieldName} 1`,
                profile: selectItem(selectValuesResources, 'Processor profile').select,
            }
        ]
        newProcessors.state.forEach((item, index) => {
            returnArray.push(
                {
                    name: `${selectItem(newProcessors.state, `Processor profile ${index + 2}`).fieldName}`,
                    profile: selectItem(newProcessors.state, `Processor profile ${index + 2}`).select,
                }
            )
        })
        return returnArray
    }

    const values = {
        postgres: {
            storage: selectItem(selectValuesResources, 'Postgres storage').select,
            profile: selectItem(selectValuesResources, 'Postgres profile').select,
        },
        processors: setNewProcessors(),
        api: {
            profile: selectItem(selectValuesResources, 'API profile').select,
            replicas: selectItem(selectValuesResources, 'API profile').replicas,
        },
        dedicated: tabsProfile[0].select === 'DEDICATED'

    }

    const codeText =
        `"scale": { 
            "addons": { 
                "postgres": { 
                    "storage": "${values.postgres.storage}G", 
                    "profile": "${values.postgres.profile}" 
                } 
            },
            "processors": {
                ${values.processors.map((item, _index) => {
            return (
                `\n"- name": "${item.name.toLowerCase()}",\n"profile": "${item.profile.toLowerCase()}"`
            )
        })}
            },  
            "api": { 
                "profile": "${values.api.profile}", 
                "replicas": ${values.api.replicas} 
            }, 
            "dedicated": ${values.dedicated}
        } `;

    // "processor": { 
    //     "profile": "${values.processor.profile}" 
    // }, 
    // const helperText = {
    //     title: '“Scale” for your manifest',
    //     description: 'Paste scale settings into your manifest to use selected configuration.'
    // }

    useEffect(() => {
        if (!isHover) {
            const timer = setTimeout(() => {
                setIsCopied(false)
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isHover])

    return (
        <section className={style['manifest']}>
            <FadeInUp delay={500}>
                <div className={style['manifest__block']}>
                    <div className={style['manifest__wrapper']}>
                        <p>“Scale” for your manifest</p>
                        {/* <GlobalHelper listIndex={'manifest'} helperObj={helperText} /> */}
                    </div>
                    <p className={style['manifest__subtitle']}>
                    To use the configuration you selected above, paste this scare into your manifest. Learn more in the <a href="https://docs.subsquid.io/deploy-squid/scale/" target="_blank" rel="noopener noreferrer">docs</a>.
                    </p>
                    <div className={style['manifest__code']}>
                        <code className={inter.className}>
                            <p>scale:</p>
                            <p>addons:</p>
                            <p>postgres:</p>
                            <p>storage: <span className={style['manifest__code_default']}>{values.postgres.storage}G</span></p>
                            <p>profile: <span className={style['manifest__code_default']}>{values.postgres.profile}</span></p>
                            <div>
                                <p>processor:</p>
                                {values.processors.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <p>- name: <span className={style['manifest__code_default']}>{item.name.toLowerCase()}</span></p>
                                            <p>profile: <span className={style['manifest__code_default']}>{item.profile.toLowerCase()}</span></p>
                                        </Fragment>
                                    )
                                })}
                            </div>
                            <p>api:</p>
                            <p>profile: <span className={style['manifest__code_default']}>{values.api.profile}</span></p>
                            <p>replicas: <span className={style['manifest__code_number']}>{values.api.replicas}</span></p>
                            {values.dedicated && (
                                <p>dedicated: <span className={style['manifest__code_boolean']}>{`${values.dedicated}`}</span></p>
                            )}
                        </code>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(codeText)
                                setIsCopied(true)
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <div
                                    className={
                                        isHover ?
                                            `${style['manifest__copy']} ${style['manifest__copy_active']}`
                                            : style['manifest__copy']
                                    }>
                                    <div>
                                        <p>{isCopied ? 'Copied' : 'Copy'}</p>
                                        {isCopied && (
                                            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckIcon">
                                                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <span></span>
                                </div>
                                <svg onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.6667 13.5H15.1667C14.2462 13.5 13.5 14.2462 13.5 15.1667V22.6667C13.5 23.5871 14.2462 24.3333 15.1667 24.3333H22.6667C23.5871 24.3333 24.3333 23.5871 24.3333 22.6667V15.1667C24.3333 14.2462 23.5871 13.5 22.6667 13.5Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.167 18.5013H9.33366C8.89163 18.5013 8.46771 18.3257 8.15515 18.0131C7.84259 17.7006 7.66699 17.2767 7.66699 16.8346V9.33464C7.66699 8.89261 7.84259 8.46868 8.15515 8.15612C8.46771 7.84356 8.89163 7.66797 9.33366 7.66797H16.8337C17.2757 7.66797 17.6996 7.84356 18.0122 8.15612C18.3247 8.46868 18.5003 8.89261 18.5003 9.33464V10.168" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </FadeInUp>
        </section>
    );
}