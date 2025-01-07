import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const BookReadingPage = () => {
  const [bookData, setBookData] = useState({
    imageUrl: '',
    translation: '',
    currentPage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // 获取书籍名称
        const bookNameResponse = await axios.get('/api/book/bookname');
        const bookName = bookNameResponse.data;

        // 获取书籍翻译
        const translationResponse = await axios.get('/api/book/translate');
        const translation = translationResponse.data;

        // 获取书籍图片
        const imageResponse = await axios.get('/api/book/pic');
        const imageUrl = `data:image/jpeg;base64,${imageResponse.data}`;

        // 获取当前页码
        const pageResponse = await axios.get('/api/book/page');
        const currentPage = pageResponse.data;

        setBookData({ imageUrl, translation, currentPage });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book data:', error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  const handleAddPage = async () => {
    await axios.put('/api/book/addpage');
    // 重新获取书籍数据
    const pageResponse = await axios.get('/api/book/page');
    setBookData((prevData) => ({
      ...prevData,
      currentPage: pageResponse.data,
    }));
  };

  const handleSubPage = async () => {
    await axios.put('/api/book/subpage');
    // 重新获取书籍数据
    const pageResponse = await axios.get('/api/book/page');
    setBookData((prevData) => ({
      ...prevData,
      currentPage: pageResponse.data,
    }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Reading Page: {bookData.currentPage}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Box>
          <img src={bookData.imageUrl} alt="Book Page" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
        <Box sx={{ maxWidth: '50%' }}>
          <Typography variant="body1" gutterBottom>{bookData.translation}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button onClick={handleSubPage} disabled={bookData.currentPage <= 1} sx={{ mr: 2 }}>Previous Page</Button>
        <Button onClick={handleAddPage}>Next Page</Button>
      </Box>
    </Box>
  );
};

export default BookReadingPage;
