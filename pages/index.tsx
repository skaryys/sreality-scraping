import Feed from '@/components/Feed'
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Sreality scraping</title>
                <meta name="description" content="Sreality scraping task" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <Feed />
            </main>
        </>
    )
}
