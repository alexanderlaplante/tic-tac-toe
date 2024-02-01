import { useState, useEffect } from 'react';
import { Board, MarkerX, MarkerO, ResetOverlay } from '..';
import { GameState } from '../../Constants';
import Button from '@mui/material/Button';
import { CalculateWinner } from '../../Utils/CalculateWinner';
import { useGame } from '../../Context/GameContext';
import { Grid, Typography, IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const TicTacToeGame = (): JSX.Element => {
    const { gameMode, playerMarker, difficulty } = useGame();
    const initialSquares = Array(9).fill(null);

    const [squares, setSquares] = useState<Array<'X' | 'O' | null>>(initialSquares);
    const [xIsNext, setXIsNext] = useState<boolean>(playerMarker === 'X');
    const [gameState, setGameState] = useState<GameState>(GameState.GameTied);
    const [winner, setWinner] = useState<'X' | 'O' | null>(null);

    const getOpponentMarker = () => (playerMarker === 'X' ? 'O' : 'X');

    const getRandomMove = (squares: Array<'X' | 'O' | null>): number => {
        let availableMoves = squares.map((square, index) => (square === null ? index : null)).filter((index) => index !== null) as number[];
        return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : -1;
    };

    function getBestMove(squares: Array<'X' | 'O' | null>, player: 'X' | 'O'): number {
        // Determine the opponent's marker
        const opponent = player === 'X' ? 'O' : 'X';

        function minimax(squares: Array<'X' | 'O' | null>, isMaximizing: boolean): { score: number; index?: number } {
            const winner = CalculateWinner(squares);

            if (winner === player) return { score: 10 }; // Base case: if the current board state is a win for the player, return score 10
            else if (winner === opponent) return { score: -10 }; // Base case: if the current board state is a win for the opponent, return score -10
            else if (!squares.includes(null)) return { score: 0 }; // Base case: if the board is full (tie), return score 0

            // Initialize bestMove object to store the best score and the associated index
            const bestMove = {
                score: isMaximizing ? -Infinity : Infinity,
                index: -1,
            };

            // Loop through each square on the board
            squares.forEach((square, index) => {
                if (square === null) {
                    // Temporarily make a move for the current player
                    squares[index] = isMaximizing ? player : opponent;
                    // Recursively call minimax to evaluate this move
                    const { score } = minimax(squares, !isMaximizing);
                    // Undo the move
                    squares[index] = null;

                    // Update bestMove if the current score is better than the best score
                    if (isMaximizing ? score > bestMove.score : score < bestMove.score) {
                        bestMove.score = score;
                        bestMove.index = index;
                    }
                }
            });

            // Return the best move (score and index) after evaluating all possible moves
            return bestMove;
        }

        // Start the minimax function with the AI as the maximizing player
        // Return the index of the best move or -1 if no move is found
        return minimax(squares, true).index ?? -1;
    }

    const makeMove = (i: number, marker: 'X' | 'O') => {
        if (!squares[i]) {
            squares[i] = marker;
            setSquares([...squares]);
            setXIsNext(!xIsNext);
        }
    };

    const handleClick = (i: number) => {
        if (CalculateWinner(squares) || squares[i] || (gameMode === 'AI' && !xIsNext)) return;
        makeMove(i, playerMarker);
    };

    useEffect(() => {
        const currentWinner = CalculateWinner(squares);
        setWinner(currentWinner);
        if (currentWinner) {
            setGameState(GameState.GameWon);
        } else if (!squares.includes(null)) {
            setGameState(GameState.GameTied);
        } else {
            setGameState(GameState.Playing);
        }
    }, [squares]);

    useEffect(() => {
        if (gameMode === 'AI' && !xIsNext && !CalculateWinner(squares) && squares.includes(null)) {
            const aiMove = difficulty === 'Easy' ? getRandomMove(squares) : getBestMove(squares, getOpponentMarker());
            if (aiMove !== -1) {
                setTimeout(() => makeMove(aiMove, getOpponentMarker()), 500); // Delay for AI move to simulate thinking
            }
        }
    }, [xIsNext, gameMode]); // Only re-run the effect if xIsNext or gameMode changes

    const ResetGame = () => {
        setSquares(initialSquares);
        setXIsNext(playerMarker === 'X');
        setGameState(GameState.Playing);
        setWinner(null);
    };

    const PlayerMarker = () => {
        if (xIsNext) {
            return <MarkerX />;
        } else {
            return <MarkerO />;
        }
    };

    let status;
    if (gameState === GameState.GameWon) {
        const winner = CalculateWinner(squares);
        status = winner ? `Winner: ${winner}` : "It's a tie! Play again?";
    } else {
        status = `Next player: ${xIsNext ? playerMarker : getOpponentMarker()}`;
    }

    if (gameState === GameState.GameTied) {
        return <ResetOverlay gameState={gameState} winner={winner} onClick={ResetGame} onTimerComplete={ResetGame} />;
    } else if (gameState === GameState.GameWon) {
        return <ResetOverlay gameState={gameState} winner={winner} onClick={ResetGame} onTimerComplete={ResetGame} />;
    } else {
        return (
            <>
                <div className="game">
                    <div className="game-player-info">
                        <Grid container>
                            <Grid item 
                                xs={1}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center">
                                <IconButton onClick={ResetGame} disableFocusRipple={true} disableRipple={true}>
                                    <RestartAltIcon />
                                    <Typography variant="button" display="block" style={{paddingLeft: '5px'}}>RESET</Typography>
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                    <Typography variant="h6">It's player {xIsNext ? `X` : `O`}'s turn</Typography>
                            </Grid>
                            <Grid item xs={1} />
                        </Grid>
                    </div>

                    <div className="game-board">
                        <Board squares={squares} onClick={handleClick} />
                    </div>
                </div>
            </>
        );
    }
};

export default TicTacToeGame;
