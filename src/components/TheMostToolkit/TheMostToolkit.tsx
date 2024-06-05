import { FadeInUp, FadeInUpFast } from '../Animation'

import style from './TheMostToolkit.module.scss'

export default function TheMostToolkit() {


    const itemsList = [
        {
            text: 'Unlimited API requests',
            icon: "/Infinity.svg",
            color: 'rgba(236, 106, 59, 0.1)'
        },
        {
            text: 'Real-time indexing',
            icon: "/FileSearch.svg",
            color: 'rgba(45, 171, 224, 0.1)'
        },
        {
            text: 'Battle-tested RPC endpoints at 2$/1M requests',
            icon: "/ShieldStar.svg",
            color: 'rgba(236, 106, 59, 0.1)'
        },
        {
            text: 'High-uptime, SLA-compliant infrastructure',
            icon: "/ClockCounterClockwise.svg",
            color: 'rgba(45, 171, 224, 0.1)'
        },
        {
            text: 'Easy API upgrades without downtime',
            icon: "/PlugsConnected.svg",
            color: 'rgba(45, 171, 224, 0.1)'
        },
        {
            text: 'Integrate external services via secrets',
            icon: "/LockLaminated.svg",
            color: 'rgba(236, 106, 59, 0.1)'
        },
        {
            text: 'Real-time monitoring and logging',
            icon: "/ListChecks.svg",
            color: 'rgba(45, 171, 224, 0.1)'
        }
    ];

    const setItems = () => {
        return itemsList.map((item, index) => {
            return (
                <div key={index} className={style["toolkit__list-item"]}>
                    <div className={style["toolkit__list-item-img"]} style={{background: item.color}}>
                        <img  src={item.icon} alt="icon"/>
                    </div>
                    <div className={style["toolkit__list-item-text"]}>
                        {item.text}
                    </div>
                </div>
            )
        })
    }

    return (
        <section className={style["toolkit"]}>
            <FadeInUpFast delay={300}>
                <div className={style["toolkit__container"]}>
                    <h2 className="title">The most powerful <br/> indexing toolkit in Web3</h2>
                    <p className={style["toolkit__subtitle"]}>Instantly retrieve unlimited data from 100+ blockchains, using familiar development tools</p>
                </div>
                </FadeInUpFast>
                <FadeInUp delay={500}>
                    <div className={style["toolkit__list"]}>{setItems()}</div>
                </FadeInUp>
        </section>
    )
}
