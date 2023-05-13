import Box from '@mui/material/Box';
import { NextPage } from "next";
import { GeneralLayout } from "../../layout-components/GeneralLayout/GeneralLayout";
import AuthForm from '../../modules/auth/components/AuthForm';

const IndexPage: NextPage = () => {
  return (
    <GeneralLayout>
      <Box sx={{maxWidth: 460, mx: 'auto'}}>
        <AuthForm/>
      </Box>

    </GeneralLayout>
  );
};

export default IndexPage;
