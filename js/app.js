let cols = 20;
let rows = cols;
let evolveGridState = document.getElementById('btnEvolveGridState');
let refreshGridState = document.getElementById('btnRefreshGridState');
let originalGrid = create2DArray(cols, rows);

populate2DArray();
drawGrid(originalGrid);

function create2DArray(cols, rows) {
    let array = Array(cols).fill().map(() => Array(rows).fill());
    return array;
}

function populate2DArray() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            originalGrid[i][j] = Math.floor(Math.random() * 2);
        }
    }
    console.table(originalGrid);
    return originalGrid;
}

function drawGrid(grid) { 
    let canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 400, 400);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = j * 20;
            let y = i * 20;
            if (grid[i][j] === 1) {
                ctx.fillStyle = "#01DF01";
                ctx.fillRect(x, y, 19, 19);
            }
        }
    }  
}

function createNewGrid(grid) {
    for (i = 1; i < cols - 1; i++) {
        for (j = 1; j < rows - 1; j++) {
            totalNeighbours = 0;
            totalNeighbours += originalGrid[i][j - 1]; //up mid
            totalNeighbours += originalGrid[i + 1][j - 1]; //up dx
            totalNeighbours += originalGrid[i - 1][j]; //mid sx
            totalNeighbours += originalGrid[i - 1][j - 1]; //up sx
            totalNeighbours += originalGrid[i + 1][j]; //mid dx
            totalNeighbours += originalGrid[i - 1][j + 1]; //bot sx
            totalNeighbours += originalGrid[i][j + 1]; //bot mid
            totalNeighbours += originalGrid[i + 1][j + 1]; //bot dx

            if (originalGrid[i][j] === 0) {
                switch (totalNeighbours) {
                    case 3:
                        grid[i][j] = 1;
                        break;
                    default:
                        grid[i][j] = 0;
                }
            } else if (originalGrid[i][j] === 1) {
                switch (totalNeighbours) {
                    case 0:
                    case 1:
                        grid[i][j] = 0;
                        break;
                    case 2:
                    case 3:
                        grid[i][j] = 1;
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        grid[i][j] = 0;
                        break;
                    default:
                        grid[i][j] = 0;
                }
            }
        }
    }
    populateNewBorders(grid);
    console.table(grid);
    return grid;
}

function populateNewBorders(grid) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] === undefined) {
                grid[i][j] = originalGrid[i][j];
            }
        }
    }
}

evolveGridState.addEventListener('click', function () {
    let timer = setInterval(function() {
        let newArray = create2DArray(cols, rows);
        newGrid = createNewGrid(newArray);
        originalGrid = newGrid;
        drawGrid(originalGrid);
    }, 200)
});

refreshGridState.addEventListener('click', function () {
    location.reload();
});
    


