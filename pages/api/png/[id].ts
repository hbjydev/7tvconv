import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import sharp from "sharp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const webpUrl = `https://cdn.7tv.app/emote/${id}/3x`;

    const webp = await axios.get(webpUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(webp.data, "utf-8");

    const s = await sharp(buffer).png().toBuffer();

    res.end(s);
}

