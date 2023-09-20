const redis = require("redis");
const config = require("../config").config.redis;

const client = redis.createClient({
  host: config.host,
  port: config.port,
  password: config.redisPassword,
});

client.connect();

client.on("error", (err) => console.log("Redis Client Error", err));

function refillBucket(bucket) {
  let available = parseInt(bucket.available);
  if (available === config.bucketSize) {
    return;
  }
  let currentDate = parseInt(Date.now());
  available =
    Math.floor(
      ((currentDate - parseInt(bucket.lastUsed)) / 1000) *
        config.refillRatePerSec
    ) + available;
  bucket.available = Math.min(available, config.bucketSize);
  bucket.lastUsed = currentDate;
}

async function allowRequestBucket(ip) {
  let bucket = (await client.exists(ip))
    ? await client.hGetAll(ip)
    : { available: "5", lastUsed: Date.now() };
  refillBucket(bucket);
  if (bucket.available === 0) {
    return false;
  }
  bucket.available -= 1;
  await client.hSet(ip, bucket);
  return true;
}

module.exports = { allowRequestBucket };
