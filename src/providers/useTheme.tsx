"use client";

import {createContext, ReactNode, useEffect, useState} from 'react'
import {DateTime} from "luxon";
import TimeThemeMock from "@/_mock/time-theme.mock";

export const ContextTimeTheme = createContext<{ theme: string | null, setTheme: (value: string | null) => void }>({
    theme: null,
    setTheme: (value: string | null): void => {
    }
})

interface MyProviderProps {
    children: ReactNode
}

export const ProviderTimeTheme = ({children}: MyProviderProps) => {
    const [theme, setTheme] = useState<string | null>('noon')


    const updateTheme = () => {
        const hour = DateTime.now().hour;

        // Morning
        if (hour >= TimeThemeMock.morning.startHour && hour < TimeThemeMock.morning.endHour) {
            setTheme('morning');
        } else if (hour >= TimeThemeMock.noon.startHour && hour < TimeThemeMock.noon.endHour) {
            setTheme('noon');
        } else if (hour >= TimeThemeMock.afterNoon.startHour && hour < TimeThemeMock.afterNoon.endHour) {
            setTheme('after-noon');
        } else {
            setTheme('evening');
        }
    };

    useEffect(() => {
        updateTheme();

        const intervalId = setInterval(updateTheme, 10 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <ContextTimeTheme.Provider value={{theme, setTheme}}>
            {children}
        </ContextTimeTheme.Provider>
    )
}
