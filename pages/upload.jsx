import UploadDemerit from "../components/Upload/UploadDemerit";
import UploadMerit from "../components/Upload/UploadMerit";

const Upload = () => {
  return (
    <div className="md:flex items-center justify-center min-h-screen pt-20">
      <UploadMerit />
      <UploadDemerit />
    </div>
  );
};

export default Upload;
