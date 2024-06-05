'use client'

import {useEffect, useRef, useState} from 'react'
import {Inter} from 'next/font/google'
import {usePathname} from 'next/navigation'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import '@/../public/fonts/fonts.scss'
import '@/globals.scss'
import 'swiper/css';
import 'swiper/css/grid';
import HeaderNew from '@/components/Header/HeaderNew'
import classNames from 'classnames'
import FooterNew from '@/components/Footer/FooterNew'
import {Providers} from "@/app/providers";
import FooterCloud from "@/components/FooterCloud/FooterCloud";
import BannerNav from "@/components/Banner/BannerNav";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: { children: React.ReactNode }) {

    const [headerWidth, setHeaderWidth] = useState<number>(0)

    const mainRef = useRef<HTMLElement>(null)

    const currentPath = usePathname()

    const setHeader = () => {
        if (currentPath === '/') {
            return <BannerNav />
        } else if (currentPath !== '/worker') {
            return <Header setHeaderWidth={setHeaderWidth}/>
        }
    }

    const setFooter = () => {
        if (currentPath === '/') {
            return <FooterNew/>
        } else if (currentPath !== '/worker' && headerWidth !== 0) {
            return <FooterCloud/>
        }
        {
            ((currentPath === '/worker' || currentPath === '/') || headerWidth !== 0) && <Footer/>
        }
    }

    useEffect(() => {
        if (currentPath === '/') {
            document.body.classList.add('body_main')
        } else document.body.classList.remove('body_main')
    }, [currentPath])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.indexOf('#calculator') !== -1) {
                const block = document.getElementById("#calculator")
                if (block) {
                    block.style.scrollMarginTop = `${headerWidth}px`
                    block.scrollIntoView();
                }
            } else if (window.location.href.indexOf('#pricing') !== -1) {
                const block = document.getElementById("#pricing")
                if (block) {
                    block.style.scrollMarginTop = `${headerWidth}px`
                    block.scrollIntoView();
                }
            }
        }
    })

    return (
        <html lang="en">
        <head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-6JBS6RNP90"></script>
            <script dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-6JBS6RNP90');`,
            }}></script>
            <script dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','GTM-MBVP9WJH');`,
            }}></script>
        </head>
        <body className={inter.className}>
        <Providers>
            {/* {currentPath !== '/worker' && <Header setHeaderWidth={setHeaderWidth} />} */}
            {setHeader()}
            <main ref={mainRef} style={{marginTop: `${currentPath !== '/' ? headerWidth : 0}px`}}
                  className={classNames('main', currentPath === '/' && 'main_main')}>
                {((currentPath === '/worker' || currentPath === '/') || headerWidth !== 0) && children}
            </main>
            {/* {((currentPath === '/worker' || currentPath === '/') || headerWidth !== 0) && <Footer />} */}
            {setFooter()}
        </Providers>
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-MBVP9WJH"
                height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>
        </body>
        </html>
    )
}
