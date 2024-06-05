export interface IPayBenefit{
    title: string,
    subtitle?: string,
    description: string,
    items: string[]
    button: {
        title: string,
        href: string,
    }
}


export default [
    {
        title: 'Playground',
        subtitle: 'FREE',
        description: 'For development purposes',
        items: [
            'No API query limit',
            'One development indexer',
            '10GB of database storage',
            '500k monthly RPC requests',
            'Community support',
        ],
        button: {
            title: 'Get started',
            href: 'https://app.subsquid.io/'
        },
    },
    {
        title: 'Professional',
        subtitle: 'PAY-AS-YOU-GO',
        description: 'Pay only for what you use',
        items: [
            'No API query limit',
            'Unlimited pay-as-you-go production indexers',
            'Unlimited pay-as-you-go development indexers',
            '2M monthly RPC requests',
            'Premium support',
        ],
        button: {
            title: 'Get started',
            href: 'https://app.subsquid.io/'
        },
    },
    {
        title: 'Enterprise',
        description: 'Contact us for special conditions',
        items: [
            'Everything in Professional',
            'Individual SLAs and discounts',
        ],
        button: {
            title: 'Talk to us',
            href: 'https://calendly.com/david-subsquid/subsquid-enterprise-sales'
        },
    },
] as IPayBenefit[]
