import React, { useState, useCallback, useRef, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import produce from 'immer';
import './css/App.css';

import About from './components/About';
import Buttons from './components/Buttons';
import Grid from './components/Grid';

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
  numRows: 30,
  numCols: 30,
  delay: 80,
}

function App() {
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues)
  const [numRows, setNumRows] = useState(30);
  const [numCols, setNumCols] = useState(30);
  const [delay, setDelay] = useState(80);
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

  const onUpdateDelay = evt => {
    evt.preventDefault()
    
    const newDelay = formValues.delay

    setDelay(parseInt(newDelay))
    setFormValues(initialFormValues)
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

    setTimeout(runSimulation, delay);
  }, [numRows, numCols])

  return (
    <div class='container'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Buttons 
              running={running} 
              setRunning={setRunning}
              runningRef={runningRef} 
              runSimulation={runSimulation}
              numRows={numRows}
              numCols={numCols}
              setGrid={setGrid}
              generateEmptyGrid={generateEmptyGrid}
              setGenerations={setGenerations}
              formValues={formValues}
              onInputChange={onInputChange}
              onUpdateDelay={onUpdateDelay}
              onUpdateRowSize={onUpdateRowSize}
              onUpdateColSize={onUpdateColSize}
            />
            <Grid 
              grid={grid}
              numCols={numCols}
              running={running}
              setGrid={setGrid}
              generations={generations}
            />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
        </Switch>
      
      </Router>

      </div>
  );
}

export default App;
