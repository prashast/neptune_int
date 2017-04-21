Assumptions made
=================
-> I've assumed that we will be working with the ASCII set of 128 characters
   and out of those I am only taking into consideration printable characters,
   non-printable characters and spaces are not taken into consideration
   as characters and are ignored if encountered

-> Uppercase and lowercase variants of the same alphabetic character are
   treated as a repeating character


Instructions to compile
========================

-> `make test` for the test cases 

-> `make` for accepting input through stdin 

NOTES
======
I've optimised the program for the worst case and I've voluntarily added
a constant time factor for strings smaller than 100 characters for getting
faster times for larger strings. 

In order to keep track of elements seen while traversing a string I've 
used a simple hash table that uses the ascii values of the elements 
offset by a constant(33) as the hash key in order to store it into the
hash table along with the index in the string at which it was found.
If the element has been seen before, we invalidate that hash table
entry. 

Once we are done traversing the string we can run through the valid cells of the
hash table and record the non-repeating character appearing the earliest(with
the lowest index)
