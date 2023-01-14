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

  let stringDepth = content.split("\n");
  // let depth = stringDepth.map(str => Number(str));
  // numberOfIncreases(depth);
  console.log(stringDepth);
  let moves = stringDepth.map(e => e.split(" "));
  startMoves(moves);
  // measurementIncrease(depth);
}

function startMoves(moves){
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for(let i = 0; i < moves.length; i++){
    if(moves[i][0] === "forward"){
      horizontal += Number(moves[i][1]);
      depth += Number(moves[i][1]) * aim;
    }else if(moves[i][0] === "down"){
      aim += Number(moves[i][1])
    }else if(moves[i][0] === "up"){
      aim -= Number(moves[i][1])
    }
  }

  console.log("horiz", horizontal);
  console.log("depth", depth);
  console.log("aim", aim);
  console.log("total", horizontal * depth);
}

read("Modules/Day1/input.txt")

