require("dotenv").config();

const env = process.env;

const config = {
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    redisPassword: env.REDIS_PASSWORD,
    bucketSize: parseInt(env.BUCKET_SIZE),
    refillRatePerSec: parseInt(env.REFILL_RATE_PER_SEC),
  },
  port: parseInt(env.PORT),
  forwardUrl: env.FORWARD_URL,
};

module.exports = { config };
