import React from 'react';
import { useGame } from '../../Context/GameContext';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const Scoreboard = (): JSX.Element => {
    const { wins } = useGame();

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" component="h3" style={{ marginBottom: '20px' }}>
                Scoreboard
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography>X Wins: {wins.X}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>O Wins: {wins.O}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Draws: {wins.draws}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Scoreboard;
