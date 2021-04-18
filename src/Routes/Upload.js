import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import UploadDemerit from '../Components/UploadDemerit';
import UploadMerit from '../Components/UploadMerit';

const Upload = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Carousel autoPlay={false} animation="slide">
        <Paper>
          <UploadMerit />
        </Paper>
        <Paper>
          <UploadDemerit />
        </Paper>
      </Carousel>
    </div>
  );
};

export default Upload;
