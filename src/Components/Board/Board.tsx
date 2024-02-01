import React from 'react';
import { MarkerX, MarkerO } from '../';

interface BoardProps {
    squares: ('X' | 'O' | null)[];
    onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
    const SquareTile = (value: 'X' | 'O' | null, i: number) => (
        <button className="square" onClick={() => onClick(i)}>
            {value === 'X' && <MarkerX />}
            {value === 'O' && <MarkerO />}
        </button>
    );

    return (
        <div className="board">
            {squares.map((square, index) => SquareTile(square, index))}
        </div>
    );
};

export default Board;
