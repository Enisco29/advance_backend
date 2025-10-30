import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//event listeners
client.on("error", (error) => console.log(`Redis Client Error: ${error}`));

async function redisDataStructures() {
  try {
    //strings -> SET, for storing value,
    //GET-> for getting value
    //MSET -> to set multiple values once
    //MGET -> to get multiple values once

    await client.connect();

    await client.set("user:name", "opeyemi");
    const name = await client.get("user:name");
    console.log(name);

    await client.mSet([
      "user:email",
      "lol@gmail.com",
      "user:age",
      "60",
      "user:country",
      "nigeria",
    ]);

    const [email, age, country] = await client.mGet([
      "user:email",
      "user:age",
      "user:country",
    ]);

    console.log(email, age, country);
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
}

redisDataStructures();
