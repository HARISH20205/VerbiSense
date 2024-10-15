import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import {
  capabilitiesData,
  enhancementsData,
} from "../utils/data/AboutPageData";
import CapabilitiesCard from "../components/about/CapabilitiesCard";
import EnhancementCard from "../components/about/EnhancementsCard";

function AboutPage() {
  return (
    <section className="h-screen overflow-y-auto">
      <div className="flex justify-between h-[69.6px] items-center p-4 sticky top-0 left-0 z-20 bg-white border-b-gray-300 border-b-2">
        <div className="flex gap-2">
          <FileText />
          <p className="font-bold text-lg">VerbiSense</p>
        </div>
        <div>
          <Link to="/chat" className="text-gray-600">
            Back to Chat
          </Link>
        </div>
      </div>
      <hr></hr>
      <div className="flex-col gap-10 flex m-7  justify-center">
        <section>
          <h1 className="font-semibold text-3xl mb-5">Current Capabilities</h1>
          <p className="text-lg mb-7">
            Welcome to Verbisense, your ultimate document query system! We
            empower users to effortlessly interact with diverse media formats,
            delivering accurate, context-rich responses.
          </p>
          <div className="flex max-xl:justify-center flex-wrap">
            {capabilitiesData.map((about) => (
              <CapabilitiesCard
                heading={about.heading}
                icon={about.icon}
                text={about.text}
              />
            ))}
          </div>
        </section>
        <section>
          <h1 className="font-semibold text-3xl mb-5">Future Enhancements</h1>
          <p className="text-lg mb-7">
            Exciting enhancements are on the horizon! We're constantly
            innovating to redefine how you access and utilize information.
          </p>
          <div className="flex flex-wrap w-full max-xl:justify-center ">
            {enhancementsData.map((about) => (
              <EnhancementCard
                heading={about.heading}
                icon={about.icon}
                text={about.text}
              />
            ))}
          </div>
        </section>
        <section className="text-center">
          <h1 className="font-semibold text-3xl mb-5">
            Join Us on This Journey of Innovation
          </h1>
          <p className="text-lg mb-7">
            Thank you for choosing Verbisense — let's explore together!
          </p>
          <div>
            <Link
              to="/chat"
              className="bg-gray-900 mx-auto  text-white flex gap-3 justify-center items-center max-md:text-sm max-sm:w-[60%] w-[20%] py-2 mb-5 rounded-md"
            >
              <button>Start Exploring now</button>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AboutPage;
