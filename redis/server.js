import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listeners

client.on("error", (error) => console.log(`Redis Client Error: ${error}`));

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("Connected to Redis successfully");

    // Test setting and getting a value
    await client.set("name", "eniola");

    const extractValue = await client.get("name");

    console.log("Extracted Value:", extractValue);

    const deleteCount = await client.del("name");

    console.log(`Number of keys deleted: ${deleteCount}`);

    const extractUpdatedValue = await client.get("name");

    console.log("Extracted Updated Value:", extractUpdatedValue);

    await client.set("count", "100");
    const incrementCount = await client.incr("count");
    console.log("Incremented Count:", incrementCount);
  } catch (error) {
    console.error("Could not connect to Redis:", error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
