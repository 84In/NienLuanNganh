import React from 'react';
import { Header } from '.';
import Grid from '@mui/material/Unstable_Grid2';
import { SliderCustom } from '../../components';
const Home = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center h-full">
      <Header />
      <Grid container spacing={2} sx={{ width: '95%' }}>
        <Grid xs={12} sm={4}>
          <div>Nav Left Bar</div>
        </Grid>
        <Grid xs={12} sm={8}>
          <SliderCustom />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
