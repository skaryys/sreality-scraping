import type { NextApiRequest, NextApiResponse } from 'next'
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { pageNum } = req.query

        const flatsPerPage = 20
        const offset = (parseInt(pageNum as string) - 1) * flatsPerPage

        const flats =
            await sql`select * from flats ORDER BY id ASC OFFSET ${offset} LIMIT ${flatsPerPage}`

        res.status(200).json(flats)
    } else {
        res.status(405)
    }
}
