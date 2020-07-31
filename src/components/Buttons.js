import React from 'react';
import {Link} from 'react-router-dom';

// Buttons Component for Game of Life
const Buttons = 
    ({running, 
    setRunning, 
    runningRef, 
    runSimulation,
    numRows,
    numCols,
    setGrid,
    generateEmptyGrid,
    setGenerations, 
    formValues,
    onInputChange,
    onUpdateDelay,
    onUpdateRowSize,
    onUpdateColSize}) => {

    return (
        <div className='buttons'>
            <div className='title'>
                <h1>Conway's Game of Life</h1>
                <h2>Author: Shayne Smith</h2>
            </div>
            <div className='actions'>
                <button
                    onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true; // prevents race condition between state update and running simulation
                        runSimulation();
                    } 
                    }}
                >
                    {running ? 'Stop' : 'Start'}
                </button>
                <button onClick={() => {
                    const rows = [];
                    for (let i = 0; i < numRows; i++) {
                    rows.push(Array.from(Array(numCols), () => Math.random() > 0.5 ? 1 : 0))
                    }
                
                    setGrid(rows);
                }}>
                    Random
                </button>
                <button onClick={() => {
                    setGrid(generateEmptyGrid(numRows, numCols));
                    setGenerations(0)
                }}>
                    Clear
                </button>
            </div>

            <div className='settings'>
                <label>Game Speed Delay (ms):&nbsp;
                    <input    
                        value={formValues.delay}
                        onChange={onInputChange}
                        name='delay'
                        type='number'
                    />
                </label>
                <button
                    onClick={onUpdateDelay}
                >
                    Update Game Delay
                </button>
                <label>Number of Rows:&nbsp;
                    <input    
                        value={formValues.numRows}
                        onChange={onInputChange}
                        name='numRows'
                        type='number'
                    />
                </label>
                <button
                    onClick={onUpdateRowSize}
                >
                    Update Row Count
                </button>
                <label>Number of Columns:&nbsp;
                    <input    
                        value={formValues.numCols}
                        onChange={onInputChange}
                        name='numCols'
                        type='number'
                    />
                </label>
                <button
                    onClick={onUpdateColSize}
                >
                    Update Column Count
                </button>
                <button>
                    <Link to='/about'>Learn More</Link>
                </button>
            </div>
      </div>
    )
}

export default Buttons;