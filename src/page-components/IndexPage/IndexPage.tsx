import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { NextPage } from "next";
import { GeneralLayout } from "../../layout-components/GeneralLayout/GeneralLayout";

const IndexPage: NextPage = () => {
  return (
    <GeneralLayout>
      <Box sx={{maxWidth: 460, mx: 'auto'}}>
        <Typography>Главная страница</Typography>
      </Box>

    </GeneralLayout>
  );
};

export default IndexPage;
