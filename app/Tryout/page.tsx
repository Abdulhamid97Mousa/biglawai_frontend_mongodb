import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { RefreshPage } from "@/components/RefreshPage"; // Make sure to adjust the path

const FirstPage = () => {
  return (
    <>
      <RefreshPage />
      {
        <div className="bg-[#ecf7ff]">
          <div className=" flex flex-col mt-10 items-center justify-center h-screen px-2 text-black ">
            <div className="text-center justify-center"></div>
          </div>
        </div>
      }
    </>
  );
};

export default FirstPage;
