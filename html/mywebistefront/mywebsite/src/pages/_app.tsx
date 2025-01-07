import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import PlansTablePage from './plan_table';
import BookReadingPage from './book_read';

const theme = createTheme({

})


function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="计划表" />
          <Tab label="在线看书" />
        </Tabs>
      </AppBar>
      <Box sx={{ p: 3 }}>
        {value === 0 && <PlansTablePage />}
        {value === 1 && <BookReadingPage />}
      </Box>
    </ThemeProvider>
     
  )
}