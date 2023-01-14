import { default as fsWithCallbacks } from 'fs';
const fsP = fsWithCallbacks.promises;

// const fsP = require('fs/promises')

async function read(path) {
  let content;
  try {
    content = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // splitIntoArr(content);
  return content;
}

let x = await read('Day3/input.txt');
let binaryArr = splitIntoArr(x);
let bits = splitIntoBits(binaryArr);
lifeSupport(bits);
// let day3p1 = createNewBinary(commonNumber(bits));
// console.log(day3p1);

// function remove(bits){
//   for(let i = 0; i < bits.length; i++){
//     bits[i].shift();
//   }
// }
// remove(bits);
// console.log(commonNumber(bits));

function lifeSupport(bits) {
  let co2 = [];
  let oxygen = [];
  let mostCommon = [];
  let leastCommon = [];

  let counter = commonNumber(bits);

  console.log("coutner ", counter[0][0]);
// oxygen.push(0);
  for (let bit of bits) {
    if (counter[0]['0'] > counter[0]['1']) {
      if (bit[0] === '0') {
        // bit.shift();
        mostCommon.push(bit);
      } else {
        leastCommon.push(bit);
      }
    } else if (counter[0][0] < counter[0][1]) {
      if (bit[0] === '1') {
        // bit.shift();

        mostCommon.push(bit);
      } else {
        leastCommon.push(bit);
      }
    }
  }

  function addMost(counter) {
    if (counter[0]['0'] > counter[0]['1']) {
      oxygen.push(0);
    } else {
      oxygen.push(1);
    }
  }

  // function addLeast(counter) {
  //   if (counter[0]['0'] > counter[0]['1']) {
  //     co2.push(1);
  //   } else {
  //     co2.push(0);
  //   }
  // }

  function createMostArray(temp) {
    let counter = commonNumber(temp);
    addMost(counter);
    let i = 0;
    while (i < temp.length ) {
      if (counter[0]['0'] > counter[0]['1']) {
        if (temp[i][0] === '0') {
          temp[i].shift();
          mostCommon.push();
        }
      } else {
        temp[i].shift();
        mostCommon.push();
      }
    }
    i++;
  }

  while (mostCommon.length >= 0 && oxygen.length <= 12) {
    let temp = mostCommon;
    mostCommon = [];
    createMostArray(temp);
  }

  console.log(oxygen);

}


// function lifeSupport(bits) {
//   let mostCommon = [];
//   let leastCommon = [];
//   let oxygen = [];
//   let co2 = [];

//   // console.log(bits);

//   //will not work it will push every time
//   function redo(nums) {
//     // console.log(nums);
//     let commonNumbers = commonNumber(nums);
//     let i = 0;

//     if (commonNumbers[0][0] > commonNumbers[0][1]) {
//       oxygen.push(0);
//     }
//     else{
//       oxygen.push(1);
//     }
//     while (i < nums.length) {
//       if (commonNumbers[0][0] > commonNumbers[0][1]) {
//         if (nums[i][0] === '0') {
//           nums[i].shift();
//           mostCommon.push(nums[i]);
//         }
//       } else {
//           nums[i].shift;
//           mostCommon.push(nums[i]);
//         }
//       i++;
//     }
//   }

//   function least(nums) {

//     let commonNumbers = commonNumber(nums);

//     let i = 0;

//     if (commonNumbers[0][0] > commonNumbers[0][1]) {
//       co2.push(1);
//     }
//     else{
//       co2.push(0);
//     }

//     while (i < nums.length) {
//       if (commonNumbers[0][0] > commonNumbers[0][1]) {
//         if (nums[i][0] === '1') {
//           console.log(nums[i][0]);
//           nums[i].shift();
//           leastCommon.push(nums[i]);
//         }else{
//           //do not push
//         }
//       } else {
//           nums[i].shift;
//           leastCommon.push(nums[i]);
//         }
//       i++;
//     }


//   }

//     // redo(bits);

//     // while (oxygen.length <= 12 && mostCommon.length > 0) {
//     //   let temp = mostCommon;
//     //   mostCommon = [];
//     //   redo(temp);
//     // }

//     least(bits);
//     while(co2.length <= 12 && leastCommon.length > 0){
//       // console.log(leastCommon);
//       let temp = leastCommon;
//       leastCommon = [];
//       least(temp);
//     }

//     console.log(co2);

//   }


//P1
function splitIntoArr(content) {
  const binaryArray = content.split("\n");
  return binaryArray;
}

function splitIntoBits(binaryArray) {
  let bits = binaryArray.map(e => e.split(""));
  return bits;
}

function commonNumber(bits) {
  let counter = [];


  for (let i = 0; i < bits[0].length; i++) {
    counter.push({});
  }
  // console.log(counter);

  for (let bit of bits) {
    let i = 0;
    for (let num of bit) {
      if (num in counter[i]) {
        counter[i][num]++;
      } else {
        counter[i][num] = 1;
      }
      i++;
    }
  }

  return counter;
  // createNewBinary(counter);
}

//gamma = most common
// epsilon = least common
function createNewBinary(nums) {
  let gamma = [];
  let epsilon = [];
  for (let num of nums) {
    if (num['0'] > num['1']) {
      gamma.push('0');
      epsilon.push('1');
    } else {
      gamma.push('1');
      epsilon.push('0');
    }
  }

  gamma = gamma.join("");
  epsilon = epsilon.join("");

  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  console.log(epsilon * gamma);
}

