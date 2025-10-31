//pub/sub ->
//-> publisher -> send -> channel -> subscriber will consume

import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => console.log(`Redis Client Error: ${error}`));

async function testAdditionalFeatures() {
  try {
    await client.connect();

    // const subscriber = client.duplicate(); //create a new client -> shares the same connection
    // await subscriber.connect(); //connect to redis server for the subscriber

    // await subscriber.subscribe("dummy-channel", (message, channel) => {
    //   console.log(`Received message from ${channel}: ${message}`);
    // });

    // await client.publish("dummy-channel", "some dummy data from publisher");
    // await client.publish("dummy-channel", "some new dummy data from publisher");

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // await subscriber.unsubscribe("dummy-channel");
    // await subscriber.quit(); //close the subscriber connection

    //pipelining & transactions
    const multi = client.multi();

    multi.set("key-transaction1", "value1");
    multi.set("key-transaction2", "value2");
    multi.get("key-transaction1");
    multi.get("key-transaction2");

    const result = await multi.exec();
    console.log(result);

    const pipelineOne = client.multi();

    for (let i = 0; i < 1000; i++) {
      pipelineOne.set(`user:${i}:action`, `Action ${i}`);
    }

    await pipelineOne.exec();

    const dummyExample = client.multi();
    dummyExample.decrBy("account:1234:balance", 100);
    dummyExample.incrBy("account:0000:balance", 100);

    const finalResult = await multi.exec();

    const cartExample = client.multi();
    cartExample.hIncrBy("cart:1234", "item_count", 1);
    cartExample.hIncrBy("cart:1234", "total_price", 10);

    await multi.exec();
    console.log("performance test");
    console.time("without pipelining");
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
}

testAdditionalFeatures();
