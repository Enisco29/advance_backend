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

    // await client.set("user:name", "opeyemi");
    // const name = await client.get("user:name");
    // console.log(name);

    //lists -> LPUSH-> insert element in the beginning
    //RPUSH -> insert element and the end of list
    //LRANGE, LPOP, RPOP

    // await client.LPUSH("notes", ["note1", "note2", "note3", "note4"]);

    // const extractAllNotes = await client.lRange("notes", 0, -1);

    // console.log(extractAllNotes);

    // const firstNote = await client.lPop("notes");
    // console.log(firstNote);

    // const remainingNotes = await client.lRange("notes", 0, -1);
    // console.log(remainingNotes);

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

    // console.log(email, age, country);

    //set -> SADD -> SMEMBERS, SISMEMBER, SREM

    // await client.sAdd("user:nickname", ["john", "varum", "xyz"]);
    // const extractUserNickNames = await client.sMembers("user:nickname");

    // console.log(extractUserNickNames);

    // const isvarumIsOneOfUserNickName = await client.sIsMember(
    //   "user:nickname",
    //   "varum"
    // );
    // console.log(isvarumIsOneOfUserNickName);

    // await client.sRem("user:nickname", "xyz");

    // const updatedUserNickname = await client.sMembers("user:nickname");

    // console.log(updatedUserNickname);

    //sorted sets
    //ZADD, ZRANGE, ZRANK, ZREM

    // await client.zAdd("cart", [
    //   {
    //     score: 100,
    //     value: "Cart 1",
    //   },
    //   {
    //     score: 150,
    //     value: "Cart 2",
    //   },
    //   {
    //     score: 200,
    //     value: "Cart 3",
    //   },
    // ]);

    // const getTopCartItems = await client.zRange("cart", 0, -1);

    // console.log(getTopCartItems);

    // const extractWithScore = await client.zRangeWithScores("cart", 0, -1);

    // console.log(extractWithScore);

    // const cartToRank = await client.zRank("cart", "Cart 2");

    // console.log(cartToRank);

    const product = await client.hSet("product:info", {
      name: "fan",
      price: 100,
      rating: 4,
    });

    const getRating = await client.hGet("product:info", "rating");

    console.log(getRating);

    const getProductDetails = await client.hGetAll("product:info");

    console.log(getProductDetails);

    await client.hDel("product:info", "rating");

    const updatedProduct = await client.hGetAll("product:info");
    console.log(updatedProduct);
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
}

redisDataStructures();
