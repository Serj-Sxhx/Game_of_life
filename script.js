

/*make an empty 2D array*/
function make2DArray(col, rows) 
{
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) 
  {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols = 10;
let rows = 10;
let resolution = 8;

function setup() 
{
  createCanvas(1000, 1000);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) 
  {
    for (let j = 0; j < rows; j++) 
    {
      grid[i][j] = floor(random(2));
    }

  }
}

function draw() 
{
  background(0);

  for (let i = 0; i < cols; i++) 
  {
    for (let j = 0; j < rows; j++) 
    {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);

        rect(x, y, resolution - 1, resolution - 1);
      }

    }

  }
  
  let next = make2DArray(cols, rows);

  //compute next based on grid
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

        // Count live neighbours 
        let sum = 0;
        let neighbours = countNeighbors(grid, i, j);



        // rule no.1 if my state is 0 and 3 neighbords are alive, change my state to 1
        if (state == 0 && neighbours == 3) {
          next[i][j] = 1;
        }
        // if im alive and less that 2 or greater than 3 are alive, change my state to 0  
        else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
          next[i][j] = 0;
        }
        else {
          next[i][j] = state;
        }


      }
      
    }
    grid = next;

}




function countNeighbors(grid, x, y) 
{
  let sum = 0;
  for (let i = -1; i < 2; i++) 
  {
    for (let j = -1; j < 2; j++) 
    {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}