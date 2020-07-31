import React from 'react';
import {Link} from 'react-router-dom';

const About = () => {
    return (
        <div class='about-container'>
            <div class='text'>
                <h1>About Conway's Game of Life</h1>
                <h2>Overview</h2>

                <h3>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine. [source: Wikipedia]</h3>
                
                <div class='rules'>
                    <h2>Rules</h2>

                    <h3>Rule 1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.</h3>
                    <h3>Rule 2: Any live cell with two or three live neighbours lives on to the next generation.</h3>
                    <h3>Rule 3: Any live cell with more than three live neighbours dies, as if by overpopulation.</h3>
                    <h3>Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</h3>
                </div>

                <Link to='/'>
                    <div class='play-game-button'>
                        <p>Play Game</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default About;