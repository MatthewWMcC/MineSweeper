
var grid;
var rows = 10;
var cols = 10;
var canWidth = 400;
var canHeight = 400;
cellW = canWidth / cols;
cellH = canHeight / rows;

function Cell(x, y) {
    this.revealed = false;
    this.value = (Math.random() > 0.75 ? 'bee' : '');
    this.pos = {
        x: x,
        y: y
    }
    this.show = () => {
        rect(this.pos.x, this.pos.y, cellW, cellH);
        text(this.value, this.pos.x + cellW / 2, this.pos.y + cellH / 2)
    }
}

function setup() {
    createCanvas(canWidth, canHeight);
    grid = make2DArray(cols, rows);
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            grid[j][i] = new Cell(j * (canHeight / rows), i * (canWidth / cols));
        }
    }
}

function draw() {
    background(0);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            grid[j][i].show();
        }
    }

}

function make2DArray(cols, rows) {
    var arr = new Array(rows);
    for (var j = 0; j < rows; j++) {
        arr[j] = new Array(cols)
    }
    return arr;
}