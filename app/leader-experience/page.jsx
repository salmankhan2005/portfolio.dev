import GlowCard from "../components/helper/glow-card";
import { BsPersonWorkspace } from "react-icons/bs";
import Image from "next/image";
import AnimationLottie from "../components/helper/animation-lottie";
import lottiMan from "../assets/lottie/lotti.json";

const leaderExperiences = [
  {
    title: "Event Coordinator",
    company: "AInnovat Innovators Club, Mahendra Engineering College",
    period: "2023 – Present",
    responsibilities: [
      "Organized tech events, AI workshops, and campus hackathons to promote innovation.",
      "Collaborated with industry experts to deliver hands-on learning experiences.",
      "Enhanced student engagement through interactive AI-powered showcases."
    ]
  },
  {
    title: "Anti-Ragging Campaign Leader",
    company: "Mahendra Engineering College",
    period: "2023 – Present",
    responsibilities: [
      "Led student safety initiatives and built awareness programs across campus.",
      "Fostered a secure, inclusive, and respectful academic environment through leadership and outreach."
    ]
  }
];

export default function LeaderExperience() {
  return (
    <div className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] min-h-screen">
      <Image
        src="/section.svg"
        alt="Leader Experience"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Leader Experience
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>
      <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
        <div className="flex justify-center items-start">
          <div className="w-full max-w-xs lg:max-w-md">
            <AnimationLottie animationPath={lottiMan} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {leaderExperiences.map((experience, idx) => (
            <GlowCard key={idx} identifier={`leader-experience-${idx}`}>
              <div className="p-3 relative">
                <Image
                  src="/blur-23.svg"
                  alt="Hero"
                  width={1080}
                  height={200}
                  className="absolute bottom-0 opacity-80"
                />
                <div className="flex justify-center">
                  <p className="text-xs sm:text-sm text-[#16f2b3]">
                    {experience.period}
                  </p>
                </div>
                <div className="flex items-center gap-x-8 px-3 py-5">
                  <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                    <BsPersonWorkspace size={36} />
                  </div>
                  <div>
                    <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                      {experience.title}
                    </p>
                    <p className="text-sm sm:text-base">
                      {experience.company}
                    </p>
                    <ul className="list-disc list-inside text-sm sm:text-base mt-2 ml-4">
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
} 