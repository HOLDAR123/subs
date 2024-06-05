import React from "react";

import style from './Charts.module.scss'

export default function Charts() {

    const avatarTeamsData = [{
        avatar: "/Avatar.svg"
    },
        {
            avatar: "/Avatar1.svg"
        },
        {
            avatar: "/Avatar2.svg"
        },
        {
            avatar: "/Avatar3.svg"
        },
        {
            avatar: "/Avatar4.svg"
        },]

    const avatarCloundData = [{
        avatar: "/Avatar5.svg"
    },
        {
            avatar: "/Avatar6.svg"
        },
        {
            avatar: "/Avatar7.svg"
        },
        {
            avatar: "/Avatar8.svg"
        },
        {
            avatar: "/Avatar9.svg"
        },]

    return (
        <section className={style["charts"]}>
                <div className={style["charts__wrapper"]}>
                    <div className={style["charts__wrapper__leftPart"]}>
                        <div className={style["charts__wrapper__leftPart__heading"]}>
                            Trusted by
                        </div>
                        <div className={style["charts__wrapper__leftPart__text"]}>
                            Enterprise-grade reliability for individual developers, analysts, companies, and projects of
                            all sizes
                        </div>
                    </div>
                    <div className={style["charts__wrapper__rightPart"]}>
                        <div className={style["charts__wrapper__rightPart__teams"]}>
                            <div className={style["charts__wrapper__rightPart__teams__heading"]}>
                                TEAMS
                            </div>
                            <div className={style["charts__wrapper__rightPart__teams__amountOrange"]}>
                                650+
                            </div>
                            <div className={style["charts__wrapper__rightPart__teams__avatar"]}>
                                {avatarTeamsData.map((data) => (<img src={data.avatar} alt="avatar"/>))
                                }
                                <div style={{background:"#EC6A3B"}}>650+</div>
                            </div>
                        </div>

                        <div className={style["charts__wrapper__rightPart__teams"]}>
                            <div className={style["charts__wrapper__rightPart__teams__heading"]}>
                                CLOUD INDEXERS
                            </div>
                            <div className={style["charts__wrapper__rightPart__teams__amountBlue"]}>
                                8,5k+
                            </div>
                            <div className={style["charts__wrapper__rightPart__teams__avatar"]}>
                                {avatarCloundData.map((data) => (<img src={data.avatar} alt="avatar"/>))}
                                <div style={{background:"#2DABE0"}}>8,5k+</div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}
