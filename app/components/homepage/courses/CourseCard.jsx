"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BsBook } from 'react-icons/bs';
import GlowCard from '../../helper/glow-card';

const courseImages = {
  'Java Programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'Cloud Computing': 'https://cdn-icons-png.flaticon.com/512/4144/4144717.png',
  'Full Stack Development Program': 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png',
};

const courseDescriptions = {
  'Java Programming': 'A comprehensive course covering Java fundamentals, object-oriented programming, and application development. Gained practical experience in building both console and GUI-based Java applications, preparing for real-world software challenges.',
  'Cloud Computing': 'This course introduced the essentials of cloud infrastructure, virtualization, and service models. Explored deployment strategies and gained hands-on experience with cloud platforms and SaaS solutions.',
  'Full Stack Development Program': 'An immersive program focused on modern web technologies. Developed skills in both frontend and backend, building scalable and user-friendly web applications from scratch.',
};

export default function CourseCard({ course, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlowCard identifier={`course-${index}`}>
        <div className="p-3 relative text-white">
          <Image
            src="/blur-23.svg"
            alt="Background"
            width={1080}
            height={200}
            className="absolute bottom-0 opacity-80"
          />
          <div className="flex justify-center">
            <p className="text-xs sm:text-sm text-[#16f2b3]">
              {course.platform} &bull; {course.year}
            </p>
          </div>
          <div className="flex items-center gap-x-8 px-3 py-5">
            <div className="text-violet-500 transition-all duration-300 hover:scale-125">
              <BsBook size={36} />
            </div>
            <div>
              <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                {course.title}
              </p>
              <p className="text-sm sm:text-base text-[#d3d8e8]">
                {courseDescriptions[course.title]}
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base mt-2 ml-4 text-[#b3b8c5]">
                {course.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
} 