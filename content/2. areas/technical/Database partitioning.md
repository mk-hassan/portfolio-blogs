---
tags:
  - Database
  - sharding
type: permanent
date: 29-12-2025
time: 00:54
parent:
childs:
  - "[[Vertical sharding]]"
  - "[[Horizontal sharding]]"
aliases:
folgezettel:
reference:
---
## Intuition
Problem trying to solve:
1. Increasing amount of data (large data)
2. Concurrent read/writes traffic (large load)
This will cause:
- Increasing Latency (more time to perform queries)
- Lower throughput

As a result a single-node database server isn't enough
> [!NOTE]
> Node : The machine itself running the RDBMS
> Database: The actual application eg. Postgres running on port 5432 inside the machine (Node)
> 
> The resources used by the RDBMS are the memory, cpu, and storage

Isn't enough has many meanings:
1. Lots of data can't be stored within the node's disk
   A possible solution is to add more storage capacity or to split the data to different nodes (that's what is called Sharding) `from` [[What's distributed systems?]] `remember the statefule nodes case-B where state of the system = state-A + state-B` that's a typical `stateful distributed system` no more no less. It aims to achieve scalability and availability and that's the purpose of distributed systems.
2. Lots of requests,  then scale up the node's memory and compute power `Vertical scaling` then you move to `horizontal scaling` again that's all about the understanding of distributed systems.

The main solution is to split the data 
1. splitting the data within the same database instance (table split) for faster querying
2. splitting the data on different database servers within the same node
3. splitting the data on different database servers on different nodes

we aim to achieve **Balanced** partitions, so that no new node becomes the bottleneck or accepts more requests than other nodes (hotspots)

There are 2 types of sharding:
- [[2. areas/technical/Horizontal sharding|Horizontal sharding]]
- [[Vertical sharding]]

> How the clients talk to partitions ? (Request Routing)

1. Clients knows the partitions (direct request)
2. Routing tier sth in the middle handles the requests (Proxy)
3. Send to any partition and if it's not the correct one it forwards the request to the correct node

> how these components know about updates in the partitioning of the nodes.

ZooKeeper works as management server, and know node asks it for any info

> How queries are executed on distributed databases system ?

An orchestration can happen by a **proxy** depending on the query whether it depends only on the partitioning key or other columns also

When you send an SQL query, it goes through a specific lifecycle to determine which node has your data and how to retrieve it.

**The "Brain": The Query Router**
Your application does not connect to the shards directly. It connects to a **Query Router** (or Coordinator). This router contains the "Global Map" (metadata) of where all data lives.
When a query arrives, the Router analyzes it to decide on one of two paths:
1. **Direct Routing (The Fast Path)**
2. **Scatter-Gather (The Slow Path)**

For vertical scaling the proxy may need to perform part of the query on some node then send the results to another node to perform joins (remember MicroServices architecture) and the query has join between 2 different tables on different services.

For horizontal scaling:
### Scenario A: The Fast Path (Direct Routing)

This happens when your query **contains the Sharding Key**.

**Example:**
- **Sharding Key:** `user_id`
- **Query:** `SELECT * FROM orders WHERE user_id = 105;`

**Execution Flow:**
1. **Parsing:** The Router sees `user_id = 105`.
2. **Hashing/Lookup:** It applies the sharding algorithm (e.g., `105 % 10 = 5`) and determines that this data lives **only** on **Shard #5**.
3. **Forwarding:** The Router sends the SQL query _only_ to Shard #5.
4. **Local Execution:** Shard #5 executes the query locally (using its standard local storage engine).
5. **Return:** Shard #5 sends the rows back to the Router, which forwards them to you.

**Latency:** Very low (almost the same as a single-server database).

---
### Scenario B: The Slow Path (Scatter-Gather)

This happens when your query **does NOT contain the Sharding Key**.

**Example:**
- **Sharding Key:** `user_id`
- **Query:** `SELECT * FROM orders WHERE date = '2023-01-01';`

**Execution Flow:**

1. **Parsing:** The Router sees the query is looking for a `date`, but it has no idea which users placed orders on that date. It could be anyone on any shard.
2. **Broadcast (Scatter):** The Router sends the **same SQL query** to **ALL** shards (nodes) in the cluster simultaneously.
3. **Local Execution:** Every shard searches its own local data for orders on '2023-01-01'.
4. **Merging (Gather):**
    - Shard 1 finds 2 records.
    - Shard 2 finds 0 records.
    - Shard 3 finds 10 records.
    - They all send these results back to the Router.
5. **Aggregation:** The Router collects all results into one list and sends it to you.

**Latency:** High. The speed of the query is limited by the **slowest shard** in the cluster.

---

### Scenario C: The "Hard" Operations (Sorting & Aggregation)

Things get tricky when you use `ORDER BY`, `GROUP BY`, or `LIMIT` in a **Scatter-Gather** scenario.

**Example:** `SELECT * FROM orders ORDER BY date LIMIT 5` (No sharding key).

1. **The Mistake:** If the router just asks every shard for their "top 5", Shard A might return 5 recent orders, but Shard B might have even _more_ recent orders that get ignored.
2. **The Fix (Two-Phase Execution):**
    - **Phase 1 (Local):** The Router asks _every_ shard for their top 5.
    - **Phase 2 (Global):** If you have 10 shards, the Router receives 50 rows (5 from each).
    - **Final Sort:** The Router sorts these 50 rows in its own memory, picks the absolute top 5, and discards the rest.

---

### Scenario D: The Nightmare (Distributed Joins)

Joining two tables that are on different shards is the most expensive operation in a distributed database.

**1. Co-located Join (Efficient)** If both tables are sharded by the **same key** (e.g., `Users` and `Orders` are both sharded by `user_id`), the data for "User 105" and "Orders for 105" live on the same node. The join happens locally on that node.

**2. Broadcast Join (Small Table)** If you join a massive `Orders` table (sharded) with a tiny `Currency` table (not sharded), the Router will copy the entire `Currency` table to **every single shard** so they can do the join locally.

**3. Shuffle Join (Expensive)** If you join two massive tables on a column that is **not** the sharding key, the database must perform a **Shuffle**.
- **Step 1:** Every node reads its data.
- **Step 2:** Every node redistributes (shuffles) its data across the network to other nodes based on the join keys.
- **Step 3:** Once the data is realigned, the join is performed.
- _Note: This saturates the network and is usually avoided in high-performance systems._

