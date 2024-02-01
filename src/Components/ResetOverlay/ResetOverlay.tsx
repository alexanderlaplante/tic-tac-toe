import React from 'react';
import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { GameState } from '../../Constants';
import { CountdownTimer } from '..';
import './ResetOverlay.scss';

interface ResetOverlayProps {
    gameState: GameState;
    winner?: 'X' | 'O' | null;
    onClick?: () => any;
    onTimerComplete?: () => any;
}

export const ResetOverlay = (props: ResetOverlayProps): JSX.Element | null => {
    const { gameState, winner, onClick, onTimerComplete } = props;
    const isWinner = gameState === GameState.GameWon;
    const statusText = isWinner ? `Player ${winner} Won!` : 'You Tied!';
    return (
        <Grid container spacing={3}>
            <Grid item xs={4} />
            <Grid item xs={4} >
                <Paper 
                    elevation={3}
                    sx={{ padding: '50px 0', marginTop: '50px'}} >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}>
                        <Typography 
                            variant="h4" 
                            gutterBottom
                            sx={{fontWeight: 'bold', fontFamily: 'Poppins'}}>
                            {statusText}
                        </Typography>

                        <CountdownTimer 
                            onTimerComplete={onTimerComplete} />

                        <Button
                            size="large" 
                            variant="outlined"
                            color="primary"
                            onClick={onClick}>
                            Play Again?
                        </Button>
                    </Stack>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ResetOverlay;
