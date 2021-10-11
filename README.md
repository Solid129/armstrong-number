# Armstrong Number 

### Commands to Run

* Clone this project
* Install dependencies of the project

> npm i

Run the project using

> node index.js

# Introduction 

* Verifies if entered number is an Armstrong number or not.
* An Armstrong number is an n-digit base b number such that the sum of its (base b) digits raised to the power n is the number itself. Hence, 153 is an Armstrong number because:  <p style="color:yellow">1<sup>3</sup>+5<sup>3</sup>+3<sup>3</sup> = 153
* if not an Armstrong number program returns next lowest and highest Armstrong numbers, like for 152 it will return lowest = 9 and highest = 153.
* Program also uses a list to maintain range of Armstrong numbers to calculate next lowest and highest Armstrong numbers faster if it is repeatedly called. It doesn't work for single execution or for number out of previous calculated range of numbers.
