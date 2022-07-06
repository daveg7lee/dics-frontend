import Loader from "react-loader-spinner";

const CustomLoading = () => (
  <div className="w-full h-[80vh] flex justify-center items-center">
    <Loader type="Oval" color="#969696" height={30} width={30} />
  </div>
);

export default CustomLoading;
