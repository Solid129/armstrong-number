const prompt = require('prompt-sync')({ sigint: true });

// store calculated Armstrong numbers for faster reterival in case of 
// repeative calls for checking if it is Armstrong number
// also makes lower and higher Armstrong finding faster in case
// Note: it is only useful if program is used repeatedly. single run always calculate from scratch
const dp = [];

function main() {
  console.log('Armstrong Number Checking Program..............');
  console.log('Enter a valid number to continue or Type "exit" to EXIT')
  let number = prompt();

  while (true) {
    console.time('Time Taken is');
    number === 'exit' ? process.exit() : null;
    while (isNaN(Number(number)) || number === "") {
      console.log('Enter a valid number to continue or Type "exit" to EXIT');
      number = prompt();
      number === 'exit' ? process.exit() : null;
    }
    const memoryBefore = process.memoryUsage().heapUsed / 1024;
    // first check if number is armstrong or not
    const check = checkArmstrong(Number(number), number.length);
    if (check) {
      console.timeEnd('Time Taken is');
      console.log(`Memory Used is: ${((process.memoryUsage().heapUsed / 1024) - memoryBefore).toFixed(1)} KB`)
      console.log(`${number} is an Armstrong Number`)
    } else {
      const [lower, higher] = getNearbyArmstrongNumbers(Number(number));
      console.timeEnd('Time Taken is');
      console.log(`Memory Used is: ${((process.memoryUsage().heapUsed / 1024) - memoryBefore).toFixed(1)} KB`)
      console.log(`${number} is Not an Armstrong Number`);
      console.log(`${lower} is Closest Lower Armstrong Number`);
      console.log(`${higher} is Closest Higher Armstrong Number`);
    }
    console.log('\nEnter a New number to calculate again or Type "exit" to EXIT');
    number = prompt();
  }
}

/**
 * check if given number is Armstrong or not
 * @param {Number} number 
 * @param {Number} digits 
 * @returns {Boolean}
 */
function checkArmstrong(number, digits) {
  // checking number in list if present no need to check further and return true
  if (dp.find(d => d === number)) {
    return true;
  }
  let num = number;
  let sum = 0;

  // checking armstrong number 
  while (num > 0) {
    sum += (num % 10) ** digits;
    num = Math.floor(num / 10);
  }
  return sum === number
}

/**
 * calculate lower and higher Armstrong Numbers 
 * in case of number being not a Armstrong
 * @param {Number} number 
 */
function getNearbyArmstrongNumbers(number) {
  // set lower and higher to start 
  let lower = number - 1;
  let higher = number + 1;
  let fromDP = false;     // boolean to know if values comes from saved list or not

  // from saved list get index of just higher number from value
  // if index is on odd index that means value lies between pair
  // setting those for lower and higher
  const index = dp.findIndex(d => d > number);
  if (index !== -1 && index % 2 === 1) {
    lower = dp[index - 1];
    higher = dp[index];
    fromDP = true;
  }

  // checking if they armstrong or not12
  let lowerArm = checkArmstrong(lower, lower.toString().length);
  let higherArm = checkArmstrong(higher, higher.toString().length);
  // looping until lower and higher both are armstrong numbers
  while (true) {
    if (!lowerArm) {
      lower -= 1;
      lowerArm = checkArmstrong(lower, lower.toString().length);
    }
    if (!higherArm) {
      higher += 1;
      higherArm = checkArmstrong(higher, higher.toString().length);
    }
    if (lowerArm && higherArm) {
      break;
    }
  }
  // check if value are from saved list and if not from list then insert 
  // new range pair
  if (!fromDP) {
    dp.push(lower);
    dp.push(higher);
    dp.sort((a, b) => a - b);
  }
  return [lower, higher];
}

main();