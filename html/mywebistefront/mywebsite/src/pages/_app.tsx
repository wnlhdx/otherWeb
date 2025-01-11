import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import PlansTablePage from './plan_table';
import BookReadingPage from './book_read';

// 创建 MUI 的主题对象
const theme = createTheme({});

function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState(0);

  // 处理 Tab 切换事件
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* 全局组件渲染 */}
      <Component {...pageProps} />
      {/* 顶部导航栏 */}
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="计划表" />
          <Tab label="在线看书" />
        </Tabs>
      </AppBar>
      {/* 页面内容 */}
      <Box sx={{ p: 3 }}>
        {value === 0 && <PlansTablePage />}
        {value === 1 && <BookReadingPage />}
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
