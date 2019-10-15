import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = document.getElementById('gridEl')) {
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
  }

  blockClicked(e, block) {
    console.log(e, block);
    const allConnectedBlocks = this.getConnectedBlocks(block);
  }

  getConnectedBlocks(block, allConnectedArr = []){

    allConnectedArr.push(block)

    const sides = [      
      { x: block.x - 1, y: block.y }, //left
      { x: block.x + 1, y: block.y }, //right
      { x: block.x, y: block.y + 1 }, //top
      { x: block.x, y: block.y - 1 }  //bottom
    ]

    sides.forEach(side => {
      if(this.grid[side.x] && this.grid[side.x][side.y]){
        if(!allConnectedArr.includes(this.grid[side.x][side.y]) && block.colour === this.grid[side.x][side.y].colour){
          allConnectedArr.concat(this.getConnectedBlocks(this.grid[side.x][side.y], allConnectedArr));
        }
      }      
    })

    return allConnectedArr;
  }
}

export default BlockGrid;
