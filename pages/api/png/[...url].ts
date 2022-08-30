import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import sharp from "sharp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url: urlParts } = req.query;

    let url = (urlParts as string[]).join('/');

    if (url.startsWith('https:/')) {
        url = url.replace('https:/', 'https://');
    } else if (url.startsWith('http:/')) {
        url = url.replace('http:/', 'http://');
    } else {
        url = `https://${url}`;
    }

    const response = await axios.get(url as string, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "utf-8");

    const s = await sharp(buffer).png().toBuffer();

    res.end(s);
}

