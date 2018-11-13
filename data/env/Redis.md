### Tools: Redis

#### What is Redis?

Redis is an open-source, networked, in-memory, key-value data store with optional durability. It is written in ANSI C. The development of Redis is sponsored by Redis Labs today; before that, it was sponsored by Pivotal and VMware. According to the monthly ranking by DB-Engines.com, Redis is the most popular key-value store. The name Redis means REmote DIctionary Server.

* **Website:** [redis.io](https://redis.io)
* **Documentation:** [redis.io/documentation](https://redis.io/documentation)

#### Container

* **Image used:** [library/redis](https://hub.docker.com/_/redis/)

##### Usage

The container is accessible as `redis` host **from another container**, and uses the default redis' port, `6379`.  
This port is also expose to your host, so you can query redis **from your host** at `localhost:6379`.

No persistance solution is configured, as it really doesn't make sense in the Redis context.

