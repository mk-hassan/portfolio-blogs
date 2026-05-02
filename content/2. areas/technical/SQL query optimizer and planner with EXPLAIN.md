---
tags:
  - Database
  - Indexing
  - hussein_nasser
type: permanent
date: 05-10-2025
time: 04:24
parent:
childs:
aliases:
folgezettel:
reference:
---
In Postgres the **`explain`** command is used to return information about what the query plans Postgres will use for a given sql query

All information are **Estimations**, the query didn't executed yet. the planner just tries to get the efficient way to perform the query.

Each database has a planner that puts a plan to execute the given sql query efficient, the explain command in Postgres gives you some insights about what's the plan will be performed to execute the query.

```sql
-- definition of grades table has (10**6) rows
create table grades (
	id serial primary key,
	g int,
	name text
);

-- index on the g column
create index grades_g on grades(g);
```

## Examples

```sql
explain select * from grades;
```

```
postgres@localhost:Learning> explain select * from grades;
+-----------------------------------------------------------------+
| **QUERY PLAN**                                                      |
|-----------------------------------------------------------------|
| Seq Scan on grades  (cost=0.00..16734.01 rows=1000001 width=23) |
+-----------------------------------------------------------------+
EXPLAIN 1
Time: 0.008s
```

1. **Seq Scan** : query plan, means full table scan on other databases
   you select * and provides no filters using where, so the database will simply decide to go through the whole table and read the entire data sequentially
2. **cost=0.00..16734.01**
   -  cost usually has 2 numbers separated by 2 dots 
   - first number is called **start up cost** and the second is the **total amount of time Postgres  thinks the query will take**
   - In milliseconds
   - Start up is much more important than the Total time cost
	1. first number 0.00 means how many milliseconds it took me as a database engine to fetch the first page.
	   Why it could be zero ? you just go to the table and fetch the first row and immediately return the results which costs nothing. no prior work needed before going to the table.
	   The start up time increased if there were some work the database need to do before the actual work like sorting, aggregation, filtering. so here the database need to prepare the data somehow before fetching it.
	2. the second number 16734.01, is the estimated amount of time needed for query execution.
3. **rows=1000001** 
		- not accurate number
		- approximation of the number of rows the database is going to fetch in order to execute the query
		- notice that `SELECT SUM(tax)` will fetch all rows to accumulate the taxs.
>[!NOTE] WOW usage of rows estimate count
>Imaging you are creating instagram, and want the number of likes on a certain post as this piece of information doesn't need to be really accurate and an estimation is enough we can return the rows value here.
>
>Accurate Count will kill your performance 

1. **width=23**
   The estimated or average sum of all the bytes for all the columns

```sql
EXPLAIN SELECT * FROM grades ORDER BY g;
```

```
Index Scan using grades_d on grades  (cost=0.42..45160.78 rows=1000001 width=23)
```

remember that *g* has a btree index , so the planner decides to use it "Index Scan" instead of "Sequential Scan".

Also because the btree index is already sorted, no extra work is needed to order rows by *g*. but notice the *Startup time* cost it's not zero here so we can say the database does some extra work before fetching the data. The work is to sort the rows by g but because there's index on g and it's already sorted the work become very very trivial and the whole thing becomes to just visit the index.

notice the rows and width of the 2 queries are the same.

```sql
EXPLAIN SELECT * FROM grades ORDER BY name;
```

```
Sort  (cost=136901.96..139401.96 rows=1000001 width=23)
  Sort Key: name
  ->  Seq Scan on grades  (cost=0.00..16734.01 rows=1000001 width=23)
```

what a cost 136901.96 !!!!!!!!!

name has no index, so the database decides first it has to get the records "Seq Scan" taking no start up time as it is not nothing to go to the table to fetch the first page. Then sorting all these records based on the name which takes 136901.96ms

```sql
EXPLAIN SELECT id FROM grades;
```

```
Seq Scan on grades  (cost=0.00..16734.01 rows=1000001 width=4)
```

notice the width=4 as id is of type integer which is represented as 4 bytes.

```sql
EXPLAIN SELECT name FROM grades;
```

```
Seq Scan on grades  (cost=0.00..16734.01 rows=1000001 width=15)
```

The expected name length is 15, it's a varchar column so an average is returned .

> [!TIP] Large width
> Be careful with this number "width" especially if you returning this across the wire to your backend application. The larger this number, the larger the network you are going to take, the higher the TCP packets, performance 🪦.

```sql
EXPLAIN SELECT * FROM grades where id = 1000;
```

```
Index Scan using grades_pkey on grades  (cost=0.42..8.44 rows=1 width=23) 
```

notice expected rows to be fetches is 1, you filter by the primary key so 1 is reasonable there will be at most one record with this id.
Also the start up cost is pretty low, and the database needs only to see the index on id and to get the page contains the record, it's a prior work before fetching data so start up is not 0.00

```sql
EXPLAIN SELECT id FROM grades where id = 1000;
```

```
Index Only Scan using grades_pkey on grades  (cost=0.42..4.44 rows=1 width=4)
```

notice the difference when selecting only the id, the query plan uses `Index Only Scan` it's reasonable too the index contains the value no need to fetch any table page at all. 


Till now from [[Database Indexing]] and this note, I see 4 different plans :
1. Index only Scan
2. Index Scan
3. Bitmap Heap scan
4. (Parallel) sequential scan