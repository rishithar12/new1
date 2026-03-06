function run(){

let startTime = performance.now()

let data = JSON.parse(document.getElementById("jsonInput").value)

let grid = data.grid
let start = data.start
let target = data.targets[0]

let rows = grid.length
let cols = grid[0].length

drawGrid(grid,start,target)

let result = bfs(grid,start,target)

animatePath(result.path)

let endTime = performance.now()

document.getElementById("steps").innerText =
"Total Steps: "+result.steps

document.getElementById("time").innerText =
"Execution Time: "+Math.floor(endTime-startTime)+" ms"
}

function bfs(grid,start,target){

let dirs=[[1,0],[-1,0],[0,1],[0,-1]]

let queue=[[...start,[]]]
let visited=new Set()

while(queue.length){

let [x,y,path]=queue.shift()

let key=x+","+y
if(visited.has(key)) continue
visited.add(key)

let newPath=[...path,[x,y]]

if(x===target[0] && y===target[1]){
return {path:newPath,steps:newPath.length-1}
}

for(let d of dirs){

let nx=x+d[0]
let ny=y+d[1]

if(nx>=0 && ny>=0 && nx<grid.length && ny<grid[0].length){

if(grid[nx][ny]!==1){
queue.push([nx,ny,newPath])
}

}

}

}

return {path:[],steps:0}
}

function drawGrid(grid,start,target){

let gridDiv=document.getElementById("grid")
gridDiv.innerHTML=""

gridDiv.style.gridTemplateColumns =
`repeat(${grid[0].length},40px)`

for(let i=0;i<grid.length;i++){
for(let j=0;j<grid[0].length;j++){

let cell=document.createElement("div")
cell.classList.add("cell")

if(grid[i][j]==1) cell.classList.add("obstacle")
if(i==start[0] && j==start[1]) cell.classList.add("start")
if(i==target[0] && j==target[1]) cell.classList.add("target")

cell.id=`cell-${i}-${j}`

gridDiv.appendChild(cell)

}
}

}

function animatePath(path){

let i=0

let interval=setInterval(()=>{

if(i>=path.length){
clearInterval(interval)
return
}

let [x,y]=path[i]

let cell=document.getElementById(`cell-${x}-${y}`)
cell.classList.add("path")

i++

},300)

}