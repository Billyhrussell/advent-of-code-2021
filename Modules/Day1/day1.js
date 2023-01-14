
const fsP = require('fs/promises')


/**
 * Reads a file and turns into array
 */
async function read(path){
  let content;
  try{
    content = await fsP.readFile(path, "utf8");
  } catch(err){
    console.error(err);
    process.exit(1);
  }

  return content;

  // let stringDepth = content.split("\n");
  // let depth = stringDepth.map(str => Number(str));
  // numberOfIncreases(depth);
  // measurementIncrease(depth);
}

read('Day1/input.txt');

/**
 * Counts number of increases
 */
function numberOfIncreases(depth){
  let count = 0;

  for(let i = 0; i < depth.length; i++){
    if(depth[i+1] > depth[i]){
      count++;
    }
  }
  console.log("COUNT" , count);
  return count;
}

/**
 * Gets array of 3
 */
function measurementIncrease(depth){
  let sums = [];

  for(let i = 0; i < depth.length; i++){
    let measurement = depth[i] + depth[i+1] + depth[i+2];
    sums.push(measurement);
  }

  console.log("SUMS LENGTH" , sums.length);
  numberOfIncreases(sums);
}

let nums = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
let nums1 = [607,618, 618, 617, 647, 716, 769, 792]


// numberOfIncreases(nums1);




// fs.readFile('input.txt', 'utf8', function(err,data){
//   let content = data;
//   console.log(data);
// })



// export {fsP, read};
