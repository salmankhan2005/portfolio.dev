import { courses } from '@/utils/data/courses';
import CourseCard from './CourseCard';

export default function Courses() {
  return (
    <section id="courses" className="my-12 lg:my-24">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Courses
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {courses.map((course, idx) => <CourseCard key={idx} course={course} />)}
      </div>
    </section>
  );
} 