import { ExternalLink } from "lucide-react";
import { blogPostsData } from "@/lib/data";

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
          <p className="text-lg text-gray-600">Insights on AI, machine learning, and technology trends</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPostsData.map((post, index) => (
            <article key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-primary mb-2">{post.category} • {post.readTime}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 inline-flex items-center gap-1"
                >
                  Read More <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">Want to read more insights on AI and technology?</p>
          <a
            href="https://medium.com/@hanzlanawaz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Visit My Medium Blog
          </a>
        </div>
      </div>
    </section>
  );
}
