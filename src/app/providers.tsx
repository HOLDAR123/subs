'use client';

import {ParallaxProvider} from 'react-scroll-parallax';
import React from "react";
import {ProviderTimeTheme} from "@/providers/useTheme";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ParallaxProvider>
            <ProviderTimeTheme>
                {children}
            </ProviderTimeTheme>
        </ParallaxProvider>
    );
}
