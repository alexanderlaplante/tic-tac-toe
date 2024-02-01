import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const violetBase: string = '#7F00FF';
const violetMain: string = alpha(violetBase, 0.7);

const theme = createTheme({
    // Customize the theme as needed
    palette: {
        primary: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});

export default theme;
