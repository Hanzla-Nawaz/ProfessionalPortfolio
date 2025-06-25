import { experienceData } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <p className="text-lg text-gray-600">Building AI solutions that make a difference</p>
        </div>

        <div className="space-y-12">
          {experienceData.map((experience, index) => (
            <div key={index} className={`relative pl-8 ${index === 0 ? 'border-l-2 border-primary' : 'border-l-2 border-gray-300'}`}>
              <div className={`absolute w-4 h-4 ${index === 0 ? 'bg-primary' : 'bg-gray-300'} rounded-full -left-2 top-0`}></div>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{experience.title}</h3>
                    <p className={`font-medium ${index === 0 ? 'text-primary' : 'text-gray-600'}`}>{experience.company}</p>
                  </div>
                  <span className="text-sm text-gray-600 mt-2 sm:mt-0">{experience.period}</span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>• {achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
