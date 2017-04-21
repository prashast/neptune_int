OBJECTIVE
==========
Design a distributed cache system that is scalable, fault-tolerant
and highly available

DESIGN
=======

In-memory cache data structure
-------------------------------

In order to design a distributed cache, the first design decision
that needs to be taken is how the data should be stored across
the different server nodes in the cache. We will be using a hash 
table implementation that is distributed across the different machines.
The hash tables would be containing key value pairs. 


Considering how we are using hash table implementation for our associative
arrays, another thing that will need to be taken care of is hash collisions
which wil happen when we are scaling up our cache system. In order to 
resolve hash collisions we will use separate chaining where a list of entries
with the same hash key will be mantained. As a sort of a cheap hack, the first
record for each chain will be mantained in the array slot itself and we can 
rearrange the chain using a heuristic to keep the constantly queried element 
in the list on the front in order to try to decrease the number of pointer traversals 
that we make by one on an average.

If there's no space left in the hash table when we're trying to insert a 
new (key,value) pair we will discard the old values using the LRU scheme
similar to what Memcached uses.

We didn't opt for more sophisticated data structures such as self 
balancing load trees because even though they give better time 
complexity for worst case computations, they are slower
by a factor of `log n` for average case computations and therefore
would serve as a performance bottleneck for large data sets such
as the ones we want to deal with and also if we use these data structures
we would need a semblance of order within the data that we store which may
not always be likely. 


Handling cache misses
----------------------

The other thing that needs to be ensure that our cache remains coherent
throughout it's uptime and that cache misses are handled in an effective
and a scalable way that don't have too much of an overhead. We will need
to have two API calls similar to what Memcached has:`get_value` and `update_value`.

-> `get_value` - getting values from the cache

-> `update_value` - responsible for updating the database and invalidating the
corresponding cache entry if present


```
function get_value(int key)
  data = fetch_value(key) //queries distributed cache
  if (!data):
    data = fetch_from_db(key) //queries data base
    add_value_to_cache(key,data) //updates appropriate cache
  
  return data
```

```
function update_value(int key,value)
  ret = update_db(value) //update the database
  if ret:
    invalidate_cache_entry(key,value) //invalidate the cache entry so it's fetched on next get
```

This method of invalidating the cache entry in case of an update of the database
would ensure that the users are not given a stale view of the database when they're
querying from the in-memory cache. Also, this method would follow the method of
lazily updating the cache entry only when it's queried.

Fault tolerance
----------------

If we are building a production level distributed cache system, we need to
be highly fault-resilient and need to ensure that the data is available 
even in the case some of the cluster nodes fail. In order to ensure that
we will use the principle of redundancy and keep a backup copy of data 
that is being inserted into a cluster node on a separate cluster node as
well so as to ensure that if one cluster node fails our clients can obtain
the data that was lost from other cluster nodes holding backup copies of parts
of the data of the failed cluster node. The number of backup copies held of 
each data element is something that will need to be decided but in my opinion
holding at two most two backup copies of each (key,value) pair on separate 
cluster nodes would ensure high availability all the while keeping our overhead
of these backups low. 

In order to maintain complete availability we could story a copy of each (key,value)
pair on each cluster node, however this level of redundancy is simply not practical and 
our performance would decrease drastically on each write, something that we can't
allow to happen.

So we are trading off availability in case of drastic
multiple-node outages for acceptable write times.


Security
---------
Another thing that needs to be taken into consideration is that a flat security
model where all the clients can connect to any cluster node and read/write/update 
any value can make way for some grave security holes. We should provide a framework
for users to authenticate for cluster nodes holding critical data requiring a high 
security clearance and ensure that not all clients are allowed to access and update
this critical data if they don't have the necessary clearance. 
