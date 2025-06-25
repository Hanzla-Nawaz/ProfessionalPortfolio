import { volunteerData } from "@/lib/data";

export default function VolunteerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Community & Volunteer Work</h2>
          <p className="text-lg text-gray-600">Contributing to global AI initiatives for social impact</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {volunteerData.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-3 py-1 text-sm rounded-full ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
