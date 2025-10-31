import Redis from "ioredis";
//redis client library for nodejs

const redis = new Redis();

async function ioRedisExample() {
  try {
    await redis.set("key", "value");
    const val = await redis.get("key");
    console.log(val);
  } catch (error) {
    console.error(error);
  } finally {
    redis.quit();
  }
}
ioRedisExample();
