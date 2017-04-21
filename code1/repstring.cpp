#include <iostream>
#include <string>
#define MAX_INDEX 9999999

using namespace std;

int getrepchar(string name)
{
  int hash[100][2],val;
  for(int x = 0; x < 100; x++) {
    for(int y = 0; y < 2; y++) {
      hash[x][y] = -2;
    }}
  int index = MAX_INDEX;
  int length = name.length();
  if(length == 0) {
    cout << "Empty string" << endl;
    return 0;
  }
  
  for(int i = 0; i < length; i++) { //creating simple hash map
    if((int)name[i] <= 32) //ignoring spaces in a string
      continue;
    val = (int)name[i];

    if(val >= 97 && val <=122)
      val -= 32;
    val -= 33;
    if(hash[val][0] == 1 || hash[val][0] == -1) {
      hash[val][0] = -1;
      hash[val][1] = 0;
      continue;
    }
    hash[val][0] = 1;
    hash[val][1] = i; //storing the index
  }

  for(int i = 0; i < 100; i++) { //finding first non repeating string
    if(hash[i][0] == 1 && index > hash[i][1] && hash[i][0] != -2) 
      index = hash[i][1];
  }

  if (index < MAX_INDEX)
    cout << "The character is:" << name[index] << endl;
  else
    cout << "No non-repeating characters" << endl;
  return 0;
}

int main()
{

#ifdef TEST
  cout << "Testing strings with upper and lower case chars(Ooty)" << endl ;
  getrepchar("Ooty");

  cout << "Testing empty string" << endl ;
  getrepchar("");

  cout << "Testing string with special characters(1aa$b1aa)" << endl;
  getrepchar("1aa$b1aa");
  return 0;
#endif
  
  string name;
  cout << "Enter string:";
  getline(cin,name); //accepting the string
  getrepchar(name);
  return 0;
}
