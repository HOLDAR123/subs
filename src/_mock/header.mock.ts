import { StaticImageData } from "next/image"

import img_file from '@/../public/headerListIcons/file.svg'
import img_folder from '@/../public/headerListIcons/folder.svg'
import img_book from '@/../public/headerListIcons/book.svg'
import img_nut from '@/../public/headerListIcons/nut.svg'
import img_cloud from '@/../public/headerListIcons/cloud.svg'
import img_fire from '@/../public/headerListIcons/fire.svg'
import img_file_hover from '@/../public/headerListIcons/file_hover.svg'
import img_folder_hover from '@/../public/headerListIcons/folder_hover.svg'
import img_book_hover from '@/../public/headerListIcons/book_hover.svg'
import img_nut_hover from '@/../public/headerListIcons/nut_hover.svg'
import img_cloud_hover from '@/../public/headerListIcons/cloud_hover.svg'
import img_fire_hover from '@/../public/headerListIcons/fire_hover.svg'

export interface IHeaderList{
    title: string,
    items: {
        img: StaticImageData,
        img_hover: StaticImageData,
        href: {
            type: 'local' | 'remote',
            value: string,
            title: string,
        }
    }[]
}

export const HeaderList: IHeaderList[] = [
    {
        title: 'Resources',
        items: [
            {
                img: img_file,
                img_hover: img_file_hover,
                href: {
                    type: 'remote',
                    value: 'https://docs.subsquid.io/subsquid-network/whitepaper/',
                    title: 'Whitepaper',
                }
            },
            {
                img: img_folder,
                img_hover: img_folder_hover,
                href: {
                    type: 'remote',
                    value: 'https://docs.subsquid.io',
                    title: 'Docs',
                }
            },
            {
                img: img_book,
                img_hover: img_book_hover,
                href: {
                    type: 'remote',
                    value: 'https://blog.subsquid.io',
                    title: 'Blog',
                }
            },
        ]
    },
    {
        title: 'Products',
        items: [
            {
                img: img_nut,
                img_hover: img_nut_hover,
                href: {
                    type: 'remote',
                    value: 'https://docs.subsquid.io/sdk/overview',
                    title: 'Indexing SDK',
                }
            },
            {
                img: img_cloud,
                img_hover: img_cloud_hover,
                href: {
                    type: 'local',
                    value: '/subsquid-cloud',
                    title: 'Subsquid Cloud',
                }
            },
            {
                img: img_fire,
                img_hover: img_fire_hover,
                href: {
                    type: 'remote',
                    value: 'https://docs.subsquid.io/subgraphs-support/',
                    title: 'Subgraph Support',
                }
            },
        ]
    },
]