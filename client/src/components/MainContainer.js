import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import SliderCustom from './SliderCustom';
import LeftBar from './LeftBar';

const MainContainer = () => {
  return (
    <>
      <Grid container display='flex' justifyContent='center' gap={3}  sx={{ width: '100%' }}>
        <Grid xs={12} sm={2} sx={{ bgcolor: 'white', borderRadius: '10px'}}>
          <LeftBar />
        </Grid>
        <Grid xs={12} sm={9} sx={{ bgcolor: 'white', borderRadius: '10px' }}>
          <SliderCustom />
        </Grid>
      </Grid>
    </>
  );
};

export default MainContainer;
