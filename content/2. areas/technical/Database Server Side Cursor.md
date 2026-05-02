---
tags:
  - Database
  - hussein_nasser
type: permanent
date: 12-12-2025
time: 17:00
parent:
childs:
aliases:
folgezettel:
reference:
---
## Problem trying to fix
Imagine the following query:
```sql
SELECT COUNT(*) FROM Year_Work WHERE grad between 10 and 30;

-- 12_000_000 rows
```
what if we want to get the actual data ?
```sql
SELECT * FROM Year_Work WHERE grad between 10 and 30;
```

This can take a lot of time starting from query planning to sending the data back on a TCP connections to client ending with loading the tons of data on the internal memory of the client's machine. That's lots of time and much of space, just imaging loading 1GB of retrieved data into your memory. How much time it will take the database even to fetch them all and sending them to you !!!!!!!!

In programing there is a type of function called `Generatro Functions` , the returns data on demand, you request an item it returns an item but not the whole data at once.

Same thing in database but named `Cursor` . You said: Hey database,  I'm about to fetch this data, but don't return them right now. Create a Cursor and when I need new data I will ask you to fetch results from that cursor. So the database returns the results on demand. So the database does its work from compiling the query, execution plan, choosing the index and waits your request to fetch the next data item when you order through the cursor.

Cursor must be defined inside a transaction: 
```sql
BEGIN;

DECLARE c cursor for select * from Year_Work WHERE grade between 10 and 30;
```

Now you begin a new transaction and inside it you defined the cursor, take you **no COMMIT** yet we still need to use the cursor.

You can fetch data as you want now but still inside the transaction:
```sql
fetch c; -- fetching the next element
fetch last c; -- fetching the last element
fetch 5 c; -- fetchiug the next 5 elements
```


## Pros of using Cursors
### Save memory
Incremental loading is a very efficient technique to fetch data on demand, instead of loading 100M rows once you can fetch 100 rows process them then discard them fetching the next 100 rows.

A catch here is an interview question: How would you sort an array of 1B items ?
you can answer: where these data came from, a database ? how why not sorting them while pulling them into my memory like fetching them sorted already instead of overloading the memory.

### Streaming
As you continue pulling the rows, you can stream to another web socket connections or a bunch of gRPC connections and you can just continue pulling values.

### Cancelled
You can cancel any time. okay I got 1000 and that's enough I don't need the rest 1B rows which without cursors would be already loaded into memory and I do nothing with them.

### Paging
Paging with cursors is a good idea too. despite it's **not as easy** as cursors are `stateful`

### PL/SQL
can be used also in PL/SQL.

## Cons of using Cursors

## Stateful
There's a memory allocated for the cursor in the database.
Because a cursor defined within a transaction on a specific database server so if you 
make another request to another database server this instance knows nothing about this cursor. (You cannot share cursors essentially)

think about multiple database instances, each request you initiate from the backend application you may connect to a different server. The transaction pointing to that cursor is running on Server_1 what makes the next `fetch c;` goes to the same server. 
This can be solved using proxy by forwarding you requet to the same database server, but need a geek devops engineer.
### Long Transactions
As cursors need to run within a transaction, the transaction can take a very long time which is not good. You are stopping other people from doing normal work like some write operations can be stopped and indexing and other DDL operations if someone is currently connected performing a long running transaction.


## Client vs Server side cursors
With client side cursor you execute the query and get the whole data into the applications memory whatever number of rows 1B rows can be loaded into your memory. Then you fetch the data as you want from the applications memory without repeatedly querying the database to fetch the next row. so it's like the opposite to the server side cursor. (Huge memory load but single database visit)  

While the server side is the one the executes the query on the database and maintain the results there on the database until you requested them as you need. (Minimal memory load but taking time to fetch the next row as you need to visit the database)
you need to go back and forth to the database server every time you need more data.

You can think about them:
Client Side Cursor => pointer to the data loaded from the database into the memory
Server Side Cursor => pointer to the data on the database itself, and fetching only the required amount into your memory