import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const stops = await sql`SELECT * FROM Stops;`;
  return response.status(200).json({ stops });
}
