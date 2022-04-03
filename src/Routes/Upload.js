import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import UploadDemerit from '../Components/UploadDemerit';
import UploadMerit from '../Components/UploadMerit';
import useUser from '../Hooks/useUser';
import { useHistory } from "react-router-dom";


const Upload = () => {
  const {data, loading} = useUser();
  const history = useHistory();

  if(!loading) {
    if(data?.me?.type !== "Admin") {
      history.push("/")
    }
  }

  return (
    loading ? <div>Loading...</div> :  <div className="container">
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
