import {Metadata} from "next";

import Banner from "@/components/Banner/Banner";
import Cards from "@/components/Cards/Cards";
import DevelopersNew from "@/components/Developers/DevelopersNew";
import _developersMock from "@/_mock/developers.mock"
import Indexer from "@/components/Indexer/Indexer";
import Chains from "@/components/Chains/Chains";
import HeaderTop from "@/components/HeaderTop/HeaderTop";
import React from "react";

export const metadata: Metadata = {
    title: 'Subsquid',
}

export default function Home() {
    return (
        <>
            {/*<HeaderTop/>*/}
            <Banner/>
            <Cards/>
            <Indexer/>
            <Chains/>
            <DevelopersNew items={_developersMock}/>
        </>
    )
}
