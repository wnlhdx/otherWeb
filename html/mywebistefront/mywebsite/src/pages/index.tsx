// Next.js 的页面组件
import React from 'react';
import { Typography, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Our Book Reading App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Discover a wide range of books and read them online.
      </Typography>
      {/* 可以在这里添加更多首页特有的内容和逻辑 */}
    </Box>
  );
};

export default HomePage;
