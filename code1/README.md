Assumptions made
=================
-> I've assumed that we will be working with the ASCII set of 128 characters
   and out of those I am only taking into consideration printable characters,
   non-printable characters and spaces are not taken into consideration
   as characters

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
