Problem Statement
==================
A large file is stored in AWS S3. Find the first non-repeating character
in that s3 file assuming I have two EC2 machines at my disposal


Design
=======

In order to leverage the fact that I have two machines at my disposal
I'd break the problem up in such a way that both the machines can
work on it concurrently.

I will break the file into two parts and give one to each EC2 instance.
There will be a shared index array which will be responsible for keeping 
track of which character has been repeated or not and at what index was it found
This will be mantained in an Amazon Elastic File System that both of the instances 
will have synchronized access to.

As the two EC2 instances traverse through their half of the file, the index array
will get updated and once they're done with that the two EC2 instances will then
starting traversing through a separate half of the index array to figure out which non-
repeating character appeared first by referencing the index value and if it exists.


Algorithm
==========
The algorithm which I will follow is the same I used in the coding challenge 1.
```
Assume index array Index[128][2] initialised to -2

For each char in file:
  AcquireLock() //synchronising shared access to index array

  if Index[(int)char][0] not visited:
    Mark Index[(int)char][0] as visited
    Store index of character in Index[(int)char][1]
  else:
    Mark Index[(int)char][0] as repeated
      
  ReleaseLock()

position = POS_MAX //variable to store index of earliest non-repeating char

/*Each instance will traverse half of the index array*/

For each visited and non-repeated cell in index/2: 
  if position > Index[char][1]: 
    position = Index[char][1]

```

We will run this algorithm on both the instances and in the end the cell with the
lower position value would be our first non-repeating character in the file
  


