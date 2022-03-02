# editline
This package can retrieve, edit, and calculate the specified lines of the specified file.
# How to use
## Read a line
### loadstr
The loadstr() function allows you to read a specified line of a specified file.
example:
- example.txt
```
abc
def
ghi
jkl
mno
```
- example.js
```
const el = require('editline')
const result = el.loadstr("./example.txt", 3)
console.log(result)
//expected output: ghi
```
### loadnum
The loadnum() function can read the numbers of a specified line in a specified file.
It can also output boolean types by inserting a specific string.
example1:  
- example1.txt
```
abc
123
```
- example1.js
```
const el = require('editline')
const result1 = el.loadstr("./example1.txt", 1)
//expected ouput: Error:Any input other than numbers is invalid.
const result2 = el.loadstr("./example1.txt", 2)
console.log(result2)
//expected output: 123
```
example2:
- example2.txt
```
b:0
b:1
b:2
```
- example2.js
```
const el = require('editline')
const result1 = el.loadstr("./example2.txt", 1)
console.log(result1)
//expected output: false
const result2 = el.loadstr("./example2.txt", 2)
console.log(result2)
//expected output: true
const resul3  = el.loadstr("./example2.txt", 3)
console.log(result3)
//expected output: Error: The value you entered is invalid. Usage: b:<1 | 0>
```
### edit
The edit() function allows you to edit the contents of a specified line in a specified file.
example:
- example.txt
```
hoge
fuga
hoge
```
- example.js
```
const el = require('editline')
el.edit("example.txt", 2, "hoge")
```
- (new)example.txt
```
hoge
hoge
hohe
```
### math
The math() function allows you to calculate numbers for a specified line in a specified file.
- example.txt
```
1
```
- example.js
```
const el = require('editline')
el.math("example.txt", 1, "+1")
```
- (new)example.txt
```
2
```
