import { mountUrlQuery } from '@/utils/text';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return <Typography variant='h4'>Dashboard</Typography>;
};

Dashboard.authGuard = true;

export default Dashboard;
