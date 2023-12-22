import { ThemeProvider } from '@mui/styles';  
import CssBaseline from '@mui/material/CssBaseline';  
import { AppProps } from 'next/app';  
import theme from '../styles/theme';  

  
const useStyles = makeStyles({  
  root: {  
    backgroundColor: '#f5f5f5', // 调整背景色为浅灰色  
  },  
});  
  
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {  
  const classes = useStyles();  
  
  return (  
    <ThemeProvider theme={theme}>  
      <CssBaseline />  
      <div className={classes.root}>  
        <Component {...pageProps} />  
      </div>  
    </ThemeProvider>  
  );  
}