"use client"

import { courses } from '@/utils/data/courses';
import CourseCard from './CourseCard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimationLottie from '../../helper/animation-lottie';
import lottieFile from '../../../assets/lottie/study.json';

export default function Courses() {
  return (
    <div id="courses" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Courses"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Courses
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4 mt-18">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {courses.map((course, idx) => (
                <CourseCard key={idx} course={course} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 