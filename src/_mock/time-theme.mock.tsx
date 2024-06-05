import React from "react";
import {ISlideBlog} from "@/components/Blog/Blog";

interface TimeThemeProps {
    morning: {
        startHour: number
        endHour: number
    },
    noon: {
        startHour: number
        endHour: number
    },
    afterNoon: {
        startHour: number
        endHour: number
    }
}

export default {
    morning: {
        startHour: 3,
        endHour: 9
    },
    noon: {
        startHour: 9,
        endHour: 15
    },
    afterNoon: {
        startHour: 15,
        endHour: 18
    }

    // evening указывать не нужно, он возьмет промежуток с afterNoon по morning
} as TimeThemeProps
