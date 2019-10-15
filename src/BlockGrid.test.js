import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  it('finds all connected blocks with same colour', () => {
    const blockGrid = new BlockGrid(1,3);
    const grid = blockGrid.grid;
    grid[0][0].colour = 'red';
    grid[0][1].colour = 'red';
    grid[0][2].colour = 'green';

    const connectedBlocksArr = blockGrid.getAllConnectedBlocks(grid[0][1]);

    expect(connectedBlocksArr.length).toBe(2)
    connectedBlocksArr.forEach(block => {
      expect(block.colour).toBe('red')
    })
  })

  it('sorts connected blocks by column', () => {
    const blockGrid = new BlockGrid(2,2);
    const grid = blockGrid.grid;
    grid[0][0].colour = 'red';
    grid[0][1].colour = 'green';
    grid[1][0].colour = 'red';
    grid[1][1].colour = 'green';

    const expectedResult = {
      0: [grid[0][0]],
      1: [grid[1][0]]
    }

    const connectedBlocksArr = blockGrid.getAllConnectedBlocks(grid[0][0]);
    const result = blockGrid.sortByColumn(connectedBlocksArr);

    expect(result).toStrictEqual(expectedResult);
  })

  it('hides all connected blocks and applies "gravity", hidden block moves on top of the grid', () => {
    const blockGrid = new BlockGrid(1,3);
    const grid = blockGrid.grid;
    grid[0][0].colour = 'red';
    grid[0][1].colour = 'red';
    grid[0][2].colour = 'green';

    const connectedBlocksArr = blockGrid.getAllConnectedBlocks(grid[0][0]);
    const result = blockGrid.sortByColumn(connectedBlocksArr);
    blockGrid.updateGrid(result);

    expect(grid[0][0].colour).toBe('green');
    expect(grid[0][1].colour).toBe('transparent');
    expect(grid[0][2].colour).toBe('transparent');
  })

  xit('good luck, have fun!', () => {});
});
