import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import theme from './Utils/Theme';
import { GameProvider } from './Context/GameContext';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GameProvider>
                <App />
            </GameProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function to log results (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
