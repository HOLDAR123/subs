import { StaticImageData } from "next/image"

const point_1 = 'diagrams/point_1.svg'
const point_1_disable = 'diagrams/point_1_disable.svg'
const point_2 = 'diagrams/point_2.svg'
const point_2_disable = 'diagrams/point_2_disable.svg'
const point_3 = 'diagrams/point_3.svg'
const point_3_disable = 'diagrams/point_3_disable.svg'

const img_1_left_without = 'diagrams/img_1_left_without.svg'
const img_2_left_without = 'diagrams/img_2_left_without.svg'
const img_1_right_without = 'diagrams/img_1_right_without.png'
const img_2_right_without = 'diagrams/img_2_right_without.png'
const img_1_left_with = 'diagrams/img_1_left_with.png'
const img_1_center_without = 'diagrams/img_1_center_without.png'
const img_1_center_with = 'diagrams/img_1_center_with.png'
const img_1_right_with = 'diagrams/img_1_right_with.png'
const img_2_right_with = 'diagrams/img_2_right_with.png'
const img_3_right_with = 'diagrams/img_3_right_with.png'

const img_1_1_left_with = 'diagrams/img_1_1_left_with.png'
const img_1_1_center_with = 'diagrams/img_1_1_center_with.png'
const img_1_1_right_with = 'diagrams/img_1_1_right_with.png'
const img_1_2_right_with = 'diagrams/img_1_2_right_with.png'
const img_1_3_right_with = 'diagrams/img_1_3_right_with.png'
const img_1_4_right_with = 'diagrams/img_1_4_right_with.png'
const img_1_1_left_without = 'diagrams/img_1_1_left_without.png'
const img_1_2_left_without = 'diagrams/img_1_2_left_without.png'
const img_1_1_center_without = 'diagrams/img_1_1_center_without.png'
const img_1_1_right_without = 'diagrams/img_1_1_right_without.png'
const img_1_2_right_without = 'diagrams/img_1_2_right_without.png'
const img_1_3_right_without = 'diagrams/img_1_3_right_without.png'
const img_1_4_right_without = 'diagrams/img_1_4_right_without.png'

const img_2_1_left_with = 'diagrams/img_2_1_left_with.svg'
const img_2_1_center_with = 'diagrams/img_2_1_center_with.png'
const img_2_1_right_with = 'diagrams/img_2_1_right_with.png'
const img_2_1_left_without = 'diagrams/img_2_1_left_without.svg'
const img_2_1_center_without = 'diagrams/img_2_1_center_without.png'


export interface IIndexerDataLeftBlock{
    title: string,
    images?: string[],
    image?: {
        src: string,
        type: 'logo' | 'img'
    }
}

interface IIndexerDataCenterBlock{
    title: string,
    image: string
}

export interface IIndexerDataRightBlock{
    title: string,
    items?: {
        title: string,
        image: string
    }[],
    image?: string
}

export type IIndexerTabName = 'Indexing' | 'Decentralized Analytics' | 'Data Availability'

export interface IIndexerData{
    header: {
        without:{
            title: string,
            subtitle: string
        },
        with: {
            title: string,
            subtitle: string
        },
    }[],
    diagrams: {
        name: IIndexerTabName,
        images: string[],
        without: {
            leftBlock: IIndexerDataLeftBlock,
            center: IIndexerDataCenterBlock,
            rightBlock: IIndexerDataRightBlock
        },
        with: {
            leftBlock: IIndexerDataLeftBlock,
            center: IIndexerDataCenterBlock,
            rightBlock: IIndexerDataRightBlock
        },
    }[]
}

export const indexerData: IIndexerData = {
    header: [
        {
            without:{
                title: 'Indexing without Subsquid',
                subtitle: 'Slow, unreliable and expensive dApp development.'
            },
            with: {
                title: 'Indexing that Actually Works',
                subtitle: 'Guaranteed data availability for dApps. Low-cost and blazingly-fast.'
            },
        },
        {
            without:{
                title: 'Analytics without Subsquid',
                subtitle: 'Gatekeeping. Expensive. Limited network support.'
            },
            with: {
                title: 'Decentralized Analytics',
                subtitle: 'Open. Community-owned. Extremely cost-efficient.'
            },
        },
        {
            without:{
                title: 'Data Availability without Subsquid',
                subtitle: 'With EIP-4844 the historical data is pruned after a few weeks.'
            },
            with: {
                title: 'Guaranteed Data Availability',
                subtitle: 'Query any amount of historical data up to the genesis block with Subsquid. '
            },
        },
    ],
    diagrams: [
        {
            name: 'Indexing',
            images: [point_1, point_1_disable],
            without: {
                leftBlock: {
                    title: 'RPC',
                    images: [
                        img_1_left_without,
                        img_2_left_without
                    ]
                },
                center: {
                    title: 'Days / Weeks',
                    image: img_1_center_without
                },
                rightBlock: {
                    title: 'Indexer',
                    items: [
                        {
                            title: 'Subgraph SDK',
                            image: img_1_right_without
                        },
                        {
                            title: 'DipDup SDK',
                            image: img_2_right_without
                        },
                    ]
                }
            },
            with: {
                leftBlock: {
                    title: 'Subsquid Network',
                    image: {
                        type: 'logo',
                        src: img_1_left_with
                    }
                },
                center: {
                    title: 'Blazing fast up to\n150k blocks/s',
                    image: img_1_center_with
                },
                rightBlock: {
                    title: 'Indexer',
                    items: [
                        {
                            title: 'Squid SDK',
                            image: img_1_right_with
                        },
                        {
                            title: 'Subgraph SDK',
                            image: img_2_right_with
                        },
                        {
                            title: 'DipDup SDK',
                            image: img_3_right_with
                        },
                    ]
                }
            },
        },
        {
            name: 'Decentralized Analytics',
            images: [point_2, point_2_disable],
            without: {
                leftBlock: {
                    title: 'Centralized Service',
                    images: [
                        img_1_1_left_without,
                        img_1_2_left_without
                    ]
                },
                center: {
                    title: 'Closed\nGatekeeped',
                    image: img_1_1_center_without
                },
                rightBlock: {
                    title: 'Analytics',
                    items: [
                        {
                            title: 'CSV',
                            image: img_1_1_right_without
                        },
                        {
                            title: 'BigQuery',
                            image: img_1_2_right_without
                        },
                        {
                            title: 'Athena',
                            image: img_1_3_right_without
                        },
                        {
                            title: 'SQL',
                            image: img_1_4_right_without
                        },
                    ]
                }
            },
            with: {
                leftBlock: {
                    title: 'Subsquid Network',
                    image: {
                        type: 'logo',
                        src: img_1_1_left_with
                    }
                },
                center: {
                    title: 'Permissionless\n& Open',
                    image: img_1_1_center_with
                },
                rightBlock: {
                    title: 'Analytics',
                    items: [
                        {
                            title: 'CSV',
                            image: img_1_1_right_with
                        },
                        {
                            title: 'BigQuery',
                            image: img_1_2_right_with
                        },
                        {
                            title: 'Athena',
                            image: img_1_3_right_with
                        },
                        {
                            title: 'SQL',
                            image: img_1_4_right_with
                        },
                    ]
                }
            },
        },
        {
            name: 'Data Availability',
            images: [point_3, point_3_disable],
            without: {
                leftBlock: {
                    title: 'DA layer',
                    image: {
                        src: img_2_1_left_without,
                        type: "img"
                    }
                },
                center: {
                    title: 'No historical data',
                    image: img_2_1_center_without
                },
                rightBlock: {
                    title: 'No solution',
                }
            },
            with: {
                leftBlock: {
                    title: 'DA layer',
                    image: {
                        src: img_2_1_left_with,
                        type: 'img'
                    }
                },
                center: {
                    title: 'All historical data',
                    image: img_2_1_center_with
                },
                rightBlock: {
                    title: 'Subsquid Network',
                    image: img_2_1_right_with
                }
            },
        }
    ]
}
