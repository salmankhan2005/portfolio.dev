import Image from 'next/image';

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

export default function CourseCard({ course }) {
  return (
    <div className="border border-[#1d293a] bg-[#1b203e] rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={courseImages[course.title] || 'https://cdn-icons-png.flaticon.com/512/565/565547.png'}
        alt={course.title}
        width={64}
        height={64}
        className="mb-3"
      />
      <h3 className="text-lg font-semibold text-white mb-1 text-center">{course.title}</h3>
      <p className="text-[#16f2b3] text-sm mb-1">{course.platform} &bull; {course.year}</p>
      <p className="text-[#d3d8e8] text-sm mb-2 text-center">{courseDescriptions[course.title]}</p>
      <ul className="list-disc list-inside text-xs text-[#b3b8c5] text-left w-full pl-4">
        {course.highlights.map((h, i) => <li key={i}>{h}</li>)}
      </ul>
    </div>
  );
} 