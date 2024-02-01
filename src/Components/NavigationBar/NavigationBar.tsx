import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, ButtonGroup, Grid } from '@mui/material';
import { useGame } from '../../Context/GameContext'; 
import SettingsIcon from '@mui/icons-material/Settings';
import './NavigationBar.scss'

interface NavigationBarProps {
    Title: string;
};

export const NavigationBar = (props: NavigationBarProps): JSX.Element | null => {
    const { Title } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { gameMode, setGameMode, playerMarker, setPlayerMarker, difficulty, setDifficulty } = useGame();

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleGameMode = () => {
        setGameMode(gameMode === 'AI' ? 'Local' : 'AI');
    };

    const togglePlayerMarker = () => {
        setPlayerMarker(playerMarker === 'X' ? 'O' : 'X');
    };

    const toggleDifficulty = () => {
        setDifficulty(difficulty === 'Easy' ? 'Unbeatable' : 'Easy');
    };

    const menuId = 'primary-search-account-menu';

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    {Title}
                </Typography>
                <IconButton edge="end" aria-label="display more actions" aria-controls={menuId} aria-haspopup="true" onClick={handleMenuOpen} color="inherit">
                    <SettingsIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={toggleGameMode} autoFocus={false} divider={true} className='menu-item'>
                        <Grid container justifyContent="space-between" alignItems="center" className='menu-item-inner-wrapper'>
                            <Grid item xs={12}>
                                <Typography variant="overline" display="block" gutterBottom>
                                    Game Mode
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup variant="contained" aria-label="Game mode button group">
                                    <Button color={gameMode === 'AI' ? 'primary' : 'inherit'}>AI</Button>
                                    <Button color={gameMode === 'Local' ? 'primary' : 'inherit'}>Local</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </MenuItem>
                    <MenuItem onClick={togglePlayerMarker} autoFocus={false} divider={true} className='menu-item'>
                        <Grid container justifyContent="space-between" alignItems="center" className='menu-item-inner-wrapper'>
                            <Grid item xs={12}>
                                <Typography variant="overline" display="block" gutterBottom>
                                    Player Marker
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup variant="contained" aria-label="Player marker button group">
                                    <Button color={playerMarker === 'X' ? 'primary' : 'inherit'}>X</Button>
                                    <Button color={playerMarker === 'O' ? 'primary' : 'inherit'}>O</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </MenuItem>
                    <MenuItem onClick={toggleDifficulty} autoFocus={false} className='menu-item'>
                        <Grid container justifyContent="space-between" alignItems="center" className='menu-item-inner-wrapper'>
                            <Grid item xs={12}>
                                <Typography variant="overline" display="block" gutterBottom>
                                    Difficulty
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup variant="contained" aria-label="Difficulty button group">
                                    <Button color={difficulty === 'Easy' ? 'primary' : 'inherit'}>Easy</Button>
                                    <Button color={difficulty === 'Unbeatable' ? 'primary' : 'inherit'}>Unbeatable</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
