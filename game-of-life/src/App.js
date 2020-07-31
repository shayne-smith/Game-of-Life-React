import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer'
import './css/App.css';

// operations to cell neighbors
const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  
  [0, -1],
  [0, 1],

  [1, -1],
  [1, 0],
  [1, 1]
]

const initialFormValues = {
  numRows: 25,
  numCols: 25
}

function App() {
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues)
  const [numRows, setNumRows] = useState(25);
  const [numCols, setNumCols] = useState(25);
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }

    return rows;
  });

  const runningRef = useRef(running);
  runningRef.current = running

  const onInputChange = evt => {

    const name = evt.target.name
    const value = evt.target.value

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const generateEmptyGrid = (numRows, numCols) => {
    setRunning(false)
    const rows = [];
      for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0))
      }
  
      return rows;
  }

  const onUpdateRowSize = evt => {
    evt.preventDefault()
    
    const newNumRows = formValues.numRows

    setNumRows(parseInt(newNumRows))
    setFormValues(initialFormValues)
  }

  const onUpdateColSize = evt => {
    evt.preventDefault()
    
    const newNumCols = formValues.numCols

    setNumCols(parseInt(newNumCols))
    setFormValues(initialFormValues)
  }

  useEffect(() => {
    setRunning(false)
    setGrid(() => {
      const rows = [];
      for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0))
      }
  
      return rows;
    })
    runSimulation();
  }, [numRows, numCols])

  const runSimulation = useCallback(() => {
    
    if (!runningRef.current) {
      return;
    }

    setGenerations(generations => (generations + 1));

    // simulation
    
    setGrid(g => {
      // produce function creates a copy of grid g and updates copy 
      // this is a memoized function
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ]
              }
            })

            // determines what happens to cell next generation
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }   
      });     
    });

    setTimeout(runSimulation, 100);
  }, [numRows, numCols])

  return (
    <div class='container'>
      <div class='buttons'>
        <div class='title'>
          <h1>Conway's Game of Life</h1>
          <h2>Author: Shayne Smith</h2>
        </div>
        <div class='actions'>
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true; // prevents race condition between state update and running simulation
                runSimulation();
              } 
            }}
          >{running ? 'Stop' : 'Start'}
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


        <div class='settings'>
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
          </div>
        </div>
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
              }} />)))}
          </div>
          <div id='generationNum'>
            {'Generation Number: ' + generations}
          </div>
        </div>
      </div>
  );
}

export default App;
