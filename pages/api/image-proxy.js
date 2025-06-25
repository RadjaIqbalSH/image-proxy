import { createHmac } from 'node:crypto';
import LRU from 'lru-cache';

// import { createHmac } from 'node:crypto';

const KEY = '95cf2b13125b37dbce1d99617ebf9101985e8122a7d9b366447cf5e149cb468f';
const SALT = '47152a04d571b32d0030d86a285903435caec9faa7bf1ea2a2ad3ca7b4be29ff';

const hexDecode = (hex) => Buffer.from(hex, 'hex');

const sign = (salt, target, secret) => {
  const hmac = createHmac('sha256', hexDecode(secret));
  hmac.update(hexDecode(salt));
  hmac.update(target);
  return hmac.digest('base64url');
};

// LRU cache setup (max 50MB, TTL 1 hour)
const cache = new LRU({
  maxSize: 50 * 1024 * 1024, // 50 MB
  ttl: 1000 * 60 * 60, // 1 hour
  sizeCalculation: (value, key) => Buffer.byteLength(key + value, 'utf8'),
});

export default async function handler(req, res) {
  const { path } = req.query;

  // if (!path || typeof path !== 'string') {
  //   return res.status(400).json({ error: 'Missing or invalid "path" query parameter' });
  // }

  // const cacheKey = `signedUrl:${path}`;

  try {
    // const cached = cache.get(cacheKey);
    // if (cached) {
    //   console.log("datang dari cache")
    //   return res.status(200).json({ signedUrl: cached });
    // }

    // const signature = sign(SALT, path, KEY);
    // const signedUrl = `/${signature}/${path}`;



    const KEY = '85b977e15080cb43cabd65672d17a0eba98c2df3b058c8f091af2575a833fdf21df798219598ddf7a58e1d73e77247e3d8628a95fd59af22f0d0a8bcd3830f37'
    const SALT = 'e1aa3dbe7e67b00c61def08502a122a733d9c3abfdadb10af21825001a021da7b59161e6ec53d09364eee66c4d0ea3a0b54d831b9058733bbbf5b2c7933f9fa2'

    const hexDecode = (hex) => Buffer.from(hex, 'hex')

    const sign = (salt, target, secret) => {
      const hmac = createHmac('sha256', hexDecode(secret))
      hmac.update(hexDecode(salt))
      hmac.update(target)

      return hmac.digest('base64url')
    }

    const path = "/s_100_100/plain/https://s3.ap-southeast-1.amazonaws.com/assets.femaledaily.com/remastering-data/production/product/product-1700822745643-"

    const signature = sign(SALT, path, KEY)
    const result = `/${signature}${path}`


    // cache.set(cacheKey, signedUrl);
    return res.status(200).json({ result });
  } catch (error) {
    console.error('Error signing URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
