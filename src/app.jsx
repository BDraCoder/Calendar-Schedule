import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Calendar from './calendar';

const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process.'

    
const App = () => {
    const [themeMode, setThemeMode] = React.useState('dark');
    const theme = createTheme({
        palette: {
            mode: themeMode,
          },
    });

    const toggleHandle = async () => {
        const isDarkMode = await window.darkMode.toggle();
        setThemeMode(isDarkMode ? 'dark' : 'light');
    }
    const toggleNotiHandle = () => {
        new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    }

    return (<>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <p>Current theme source: <strong id="theme-source" style={{textTransform: 'capitalize'}}>{themeMode}</strong></p>
        
            <button id="toggle-dark-mode" onClick={toggleHandle}>Toggle Dark Mode</button>
            <button id="toggle-notification" onClick={toggleNotiHandle}>Toggle Notification</button>

            <Calendar />
            
        </ThemeProvider>
    </>);
}
export default App;