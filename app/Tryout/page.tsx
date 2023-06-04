import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const FirstPage = () => {
  return (
    <>
      <div className="bg-[#ecf7ff]">
        <div className=" flex flex-col mt-10 items-center justify-center h-screen px-2 text-black ">
          <div className="text-center justify-center">
            <button className="text-5xl font-bold ">LAW-AI</button>
          </div>

          <div className="flex space-x-3 text-center justify-center h-[900px]">
            <div>
              <div className="flex flex-col items-center justify-center mb-5">
                {/* Sun Icon */}
                <SunIcon className="h-8 w-8 text-black" />
                <h2 className="">Examples</h2>
              </div>
              <div className="space-y-4">
                <p className="infoText">
                  "Generate contract according to this e-mail"
                </p>
                <p className="infoText">
                  "Tell me the law difference in the USA"
                </p>
                <p className="infoText">"How do I practice Anglo-Saxon Law"</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center mb-5">
                {/* Sun Icon */}
                <BoltIcon className="h-8 w-8 text-black" />
                <h2 className="">Capebilities</h2>
              </div>
              <div className="space-y-4">
                <p className="infoText">
                  "Each of the offered model's of open-ai has it's own
                  Capebilities, some models can generate code, some can just
                  interact with you, choose wisly"
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center mb-5">
                {/* Sun Icon */}
                <ExclamationTriangleIcon className="h-8 w-8 text-black" />
                <h2 className="">Limitations</h2>
              </div>
              <div className="space-y-4">
                <p className="infoText">
                  "Each Model has a token limit, 4 characters = 1 token, head
                  over to open-ai to check model's token limit"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
