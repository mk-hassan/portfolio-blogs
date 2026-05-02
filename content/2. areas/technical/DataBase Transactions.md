---
tags:
  - Database
  - hussein_nasser
type: permanent
date: 20-09-2025
time: 00:40
parent:
childs:
aliases:
folgezettel:
reference:
---
A collection of queries executed in a single run (Unit of work)

But why not a single query ? It's impossible to have a single query doing everything for you, data are stored in separated tables even databases. So you will need to execute many different sql queries but treating them as if they were a single query.

example: Bank deposite
1. select balance of the giver
2. check balance >= amount to give
3. take money from the giver
4. give money to the beneficiary
You can't do all that things within a single transaction, right ?

Long transactions are not recommended in general, okay. 

## Transaction Life span

1. BEGIN
2. COMMIT OR ROLLBACK

typically in every database you need to mention that you are starting a brand new transaction, in postgres it's simply **BEGIN**

the sql commands continues executing until reaching end of the transaction and COMMIT the changes unless something wrong happens in the middle so ROLLBACK.

Committing changes has tradeoffs:
should I persist changes directly into desk or make the changes on the memory and then commit at the end when the COMMIT command executes.

Both are implemented in different database and both has pros and cons
for example persisting changes into desk directly make the final commit much faster than writing things into memory and by the end moving everything to the desk in a single shot. Persistence into dest >>>faster>>> wiring into memory and commit later.

but there's a catch what if a transaction has 10000000 queries and by the last query sth wrong happens, if the data are persisting into the desk after each query then the ROLLBACK will be very very expensive although it's faster in COMMIT,  but if the data are written into the memory then flush the memory that's it.

**So everything comes with tradeoffs, nothing wrong nothing right but choices.**

**Another critical case:**
what if when COMMIT sth wrong happened, that's the worst thing as all queries already executed and finished. In case of persisting each query result the COMMIT is fast so this case can rarely happened but in case of memory the commit takes long to persist things into memory so chances that sth wrong happens os higher.

what if the database itself crashes, the database when back should notice the transaction isn't committed and should ROLLBACK.

> [!NOTE]
> For each case the database does lots of work for you, but each database implements things differently one can optimize for COMMITs like postgres and others for crashes.

> [!TIP]
> Postgres persist every query result in desk before COMMIT, so COMMITs are fastest. lots of IO but the commits are fast.

## Read only transaction

When you inform the database that's a readonly transaction, it can make lots of optimizations.
Generating reports is a very common case on readonly-transactions. You need consistency. You need a **snapshot** of the data at the time of transaction start so no other transaction modifies anything during reading data. **(Snapshot isolation level)**

> [!WARNING]
> We are always in a transaction, you execute a single normal update query if you don't start a transaction explicitly the database starts one for you and immediately commits it. (so transaction always exists even for a single simple query by the database if not by yourself)



