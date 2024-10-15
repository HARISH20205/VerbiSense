import { PulseLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#36D7B7" loading={true} size={15} />
    </div>
  );
};

export default LoadingSpinner;
