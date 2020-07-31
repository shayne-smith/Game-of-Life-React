import React from 'react';
import produce from 'immer';

const Grid = 
    ({grid,
    numCols,
    running,
    setGrid,
    generations}) => {
    return (
        <div class='gameGrid'>
            <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 20px)`
            }}>   
                {grid.map((rows, i) => 
                    rows.map((col, j) => (
                    <div
                    key={`${i}-${j}`}
                    onClick={() => {
                        const newGrid = produce(grid, gridCopy => {
                            if (!running) {
                            gridCopy[i][j] = grid[i][j] ? 0 : 1;
                            }
                        })
                        setGrid(newGrid)
                    }}
                    style={{ 
                        width: 20, 
                        height: 20, 
                        backgroundColor: grid[i][j] ? '#F194B4' : undefined,
                        border: "solid 1px black"
                    }} 
                    />
                )))}
            </div>

            <div id='generationNum'>
                {'Generation Number: ' + generations}
            </div>
        </div>
    )
}

export default Grid;