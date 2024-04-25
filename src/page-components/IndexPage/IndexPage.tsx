import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  return (
    <Box sx={ { maxWidth: 460, mx: 'auto' } }>
      <Typography>Главная страница</Typography>
    </Box>
  );
};

export default IndexPage;
