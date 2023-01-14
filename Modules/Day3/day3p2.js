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

let x = await read('Day3/input1.txt');
let binaryArr = splitIntoArr(x);
let bits = splitIntoBits(binaryArr);
console.log("BITS BEFORE LIFE SUPPPORT: ", bits[0]);
lifeSupport(bits);
bits = splitIntoBits(binaryArr);
console.log("BITS AFTER LIFE SUPPORT ", bits[0]);
lifeLeast(bits);


function splitIntoArr(content) {
  const binaryArray = content.split("\n");
  return binaryArray;
}

function splitIntoBits(binaryArray) {
  let bits = binaryArray.map(e => e.split(""));
  return bits;
}

function commonNumber(bits) {
  let counter = {0:0, 1:0};

  for(let bit of bits){
    if(bit[0] === '0'){
      counter['0']++;
    }else{
      counter['1']++;
    }
  }

  return counter;
}

function lifeSupport(bits){
  let oxygen = []; //most common
  let co2 = []; //least common
  let least = [];
  let most = [];



  function remove(nums, counter){
    for(let i = 0; i < nums.length; i++){
      if(counter[0] > counter[1]){
        if(nums[i][0] === '0'){
          nums[i].shift();
          most.push(nums[i]);
        }
      }else{
        nums[i].shift();
        most.push(nums[i]);
      }
    }
  }

  function addOxygen(counter) {
    if (counter[0] > counter[1]) {
      oxygen.push(0);
    } else {
      oxygen.push(1);
    }
  }

  let counter = commonNumber(bits);

  addOxygen(counter);
  remove(bits, counter);

  while(oxygen.length < 5){
    counter = commonNumber(most);

    let temp = most;
    most = [];
    addOxygen(counter);
    remove(temp, counter);
  }

  console.log("OXY", parseInt(oxygen.join(""),2));


}

// function lifeSupportLeast(bits){

//   let co2 = []; //least common
//   let least = [];


//   function remove(nums, counter){
//     for(let i = 0; i < nums.length; i++){
//       if(counter[0] > counter[1]){
//         if(nums[i][0] === '1'){
//           nums[i].shift();
//           least.push(nums[i]);
//         }
//       }else{
//         nums[i].shift();
//         least.push(nums[i]);
//       }
//     }
//   }

//   function addCo2(counter) {
//     if (counter[0] > counter[1]) {
//       co2.push(1);
//     } else {
//       co2.push(0);
//     }
//   }

//   let counter = commonNumber(bits);

//   addCo2(counter);
//   remove(bits, counter);

//   while(co2.length < 12){
//     counter = commonNumber(least);

//     let temp = least;
//     least = [];
//     addCo2(counter);
//     remove(temp, counter);
//   }

//   console.log("CO2", co2.join(""));

// }

function lifeLeast(bits){

  let co2 = []; //least common
  let least = [];

  function remove(nums, counter){

    console.log("COUNTER[0]" ,counter[0]);
    console.log("COUNTER[1]" ,counter[1]);
    console.log(nums.length, "nums length")

    if(nums.length === 1){
      console.log("BEFORE PUSH", co2);
      co2.push(...nums[0]);
    }
    for(let i = 0; i < nums.length; i++){
      if(counter[0] > counter[1]){
        if(nums[i][0] === '1'){
          nums[i].shift();
          least.push(nums[i]);
        }
      }

      if(counter[0] < counter[1] || counter[1] === counter[0]){
        if(nums[i][0] === '0'){
          nums[i].shift();
          least.push(nums[i]);
        }
      }
    }

  }

  function addCo2(counter) {
    if (counter[0] > counter[1]) {
      co2.push(1);
    } else if(counter[1] > counter[0]){
      co2.push(0);
    }else{
      co2.push(0);
    }
  }

  let counter = commonNumber(bits);

  addCo2(counter);
  remove(bits, counter);

  while(co2.length < 5){
    console.log(least);
    counter = commonNumber(least);

    let temp = least;
    least = [];
    addCo2(counter);
    remove(temp, counter);
  }

  console.log("CO2", parseInt(co2.join(""),2));
  console.log("sdadasd", co2)

}