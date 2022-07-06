import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import UploadDemerit from "../components/Upload/UploadDemerit";
import UploadMerit from "../components/Upload/UploadMerit";

const Upload = () => {
  return (
    <div className="container">
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
