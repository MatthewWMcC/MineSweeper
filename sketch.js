
var grid;
var rows = 10;
var cols = 10;
var canWidth = 600;
var canHeight = 600;
var cellW = canWidth / cols;
var cellH = canHeight / rows;

function Cell(x, y) {
    this.revealed = false;
    this.blocked = false;
    this.value = (Math.random() > 0.80 ? 'mine' : '');
    this.pos = {
        x: x,
        y: y
    }
    this.color = { r: 200, g: 200, b: 200 }
    this.show = () => {
        textSize(20);
        textAlign(CENTER, CENTER);
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.pos.x, this.pos.y, cellW, cellH);
        if (this.revealed) {
            fill(255);
            rect(this.pos.x, this.pos.y, cellW, cellH);
            fill(0);
            text(this.value, this.pos.x + cellW / 2, this.pos.y + cellH / 2)
        }
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
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var counter = 0;
            if (grid[j][i].value === 'mine') {
                continue;
            }
            if (j != 0 && grid[j - 1][i].value === 'mine') { // top
                counter += 1;
            }
            if (i != 0 && grid[j][i - 1].value === 'mine') {//left
                counter += 1;
            }
            if (j != 0 && i != 0 && grid[j - 1][i - 1].value === 'mine') {//top left
                counter += 1;
            }
            if (i != cols - 1 && grid[j][i + 1].value === 'mine') { //right
                counter += 1;
            }
            if (j != rows - 1 && i != 0 && grid[j + 1][i - 1].value === 'mine') {//bottom left
                counter += 1;
            }
            if (i != cols - 1 && j != 0 && grid[j - 1][i + 1].value === 'mine') { //top right
                counter += 1;
            }
            if (j != rows - 1 && i != cols - 1 && grid[j + 1][i + 1].value === 'mine') {//bottom right
                counter += 1;
            }
            if (j != rows - 1 && grid[j + 1][i].value === 'mine') { //bottom
                counter += 1;
            }
            grid[j][i].value = (counter === 0 ? '' : counter);

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

function mousePressed(e) {
    var cell = grid[floor(mouseX / cellW)][floor(mouseY / cellH)]
    if (mouseButton === LEFT) {
        if (mouseX > canWidth || mouseY > canHeight) {
            return
        }
        if (!cell.blocked) {
            cell.revealed = true;
        }

    }
    if (mouseButton === RIGHT) {
        if (cell.blocked) {
            cell.color = { r: 200, g: 200, b: 200 };
        } else {
            cell.color = { r: 200, g: 0, b: 0 };
        }

        cell.blocked = !cell.blocked;
    }

}