// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const CoinMarketCap = require('coinmarketcap-api')
const NEXT_PUBLIC_CMC_API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY;
//  /v1/cryptocurrency/listings/latest
type Data = {
  name: string
}
//https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const apiKey = NEXT_PUBLIC_CMC_API_KEY
  const client = new CoinMarketCap(apiKey)
  const quote = await client.getQuotes({ symbol: 'BTC', convert: 'USD' }).then(e => e.data.BTC.quote.USD).catch(e => e)

  res.status(200).json(quote)
}
