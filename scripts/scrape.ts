import puppeteer, { Browser } from 'puppeteer'
import dotenv from 'dotenv'
import postgres from 'postgres'

// postgre setup
dotenv.config()
let sql = postgres()
if (!process.env.DATABASE_URL) {
    throw new Error('Please add DATABASE_URL to .env file')
} else {
    sql = postgres(process.env.DATABASE_URL)
}

// setup for scraping 500 items
const base_url: string = 'https://www.sreality.cz/hledani/prodej/byty?strana='
const start_page: number = 1
const end_page: number = 25
const url_array: string[] = []

for (let page = start_page; page <= end_page; page++) {
    url_array.push(`${base_url}${page}`)
}

//save items to postgresql
const saveToDatabase = async (flats: { title: string; image: string }[]) => {
    await sql`insert into flats ${sql(flats, 'title', 'image')}`
}

//scrape items from page
const scrapePage = async (url: string, browser: Browser) => {
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('.dir-property-list')

    const flats = await page.evaluate(() => {
        const propertyElements = Array.from(
            document.querySelectorAll('.dir-property-list .property'),
        )
        return propertyElements.map((propertyElement) => {
            const nameElement = propertyElement.querySelector('.name')
            const imageElement = propertyElement.querySelector('preact img')

            return {
                title: nameElement?.textContent ?? '',
                image: imageElement?.getAttribute('src') ?? '',
            }
        })
    })

    await saveToDatabase(flats)

    await page.close()
}

//run all with Puppeteer
;(async () => {
    //delete if already exists
    await sql`delete from flats`
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

    try {
        for (const url of url_array) {
            await scrapePage(url, browser)
        }
    } catch (error) {
        console.error('Error happened, more details here: ', error)
    } finally {
        await browser.close()
        await sql.end()
    }
})()
