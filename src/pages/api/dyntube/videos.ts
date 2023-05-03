// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const dyntubeRes = await fetch(
      `${process.env.DYNTUBE_API_URL}/videos?` +
        new URLSearchParams({
          projectId: process.env.DYNTUBE_PROJECT_ID as string,
        }),
      {
        headers: {
          Authorization: `Bearer ${process.env.DYNTUBE_API_TOKEN}`,
        },
      }
    );

    if (!dyntubeRes.ok) {
      return res.status(400).end();
    }
    const resJson = await dyntubeRes.json();
    res.status(200).json(resJson);
  }

  return res.status(404).end();
}
