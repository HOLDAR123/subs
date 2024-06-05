"use client"

import React, {useEffect, useState} from "react";
import classNames from "classnames";
import Image from "next/image";
import footer_monkey_close from '@/../public/footer_monkey_close.svg'
import footer_bear from '@/../public/bear.png'
import footer_chest from '@/../public/footer_chest.svg'

import './TabFooter.scss'

export default function TabFooter() {

    const [isOpen, setIsOpen] = useState(false)

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 767);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize); // Удаляем обработчик при размонтировании компонента
        };
    }, []);

    return (
        <footer className={'footers--new'}>
           <div className={'container'}>
               <div className="footers--new__close">
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_1')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_2')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_3')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_4')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_5')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_6')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_7')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_8')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <svg className={classNames('footers--new__close__bubble', 'footers--new__close__bubble_9')} width="14"
                        height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path
                           d="M6.57068 11.7199C9.34315 11.7199 11.5907 9.47242 11.5907 6.69995C11.5907 3.92748 9.34315 1.67993 6.57068 1.67993C3.79821 1.67993 1.55078 3.92748 1.55078 6.69995C1.55078 9.47242 3.79821 11.7199 6.57068 11.7199Z"
                           stroke="white" stroke-width="3" stroke-miterlimit="10"/>
                   </svg>
                   <Image className="footers--new__close__monkey" src={footer_monkey_close} alt={'footer_monkey_close'}/>
                   <Image className="footers--new__close__bear" src={footer_bear} alt={'footer_bear'}/>
                   <Image className="footers--new__close__chest" src={footer_chest} alt={'footer_chest'}/>
                   <div className="footers--new__close__block">
                       <h2 className="din">Unlocking data access <br/> for devs everywhere</h2>
                       <a
                           href="https://calendly.com/d/yzj-48g-bf7/subsquid-demo?month=2023-10"
                           target="_blank" rel="noopener noreferrer">
                          <button onClick={() => {}}
                                  className={classNames('buttonsss', 'din__button_orange', 'footer--new__close__block__button')}>
                              <p>Book demo now!</p>
                          </button>
                      </a>
                   </div>
               </div>
           </div>
        </footer>
    )
}


