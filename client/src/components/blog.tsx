import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    title: "Building Production-Ready LLM Applications with LangChain",
    date: "January 15, 2024",
    category: "Machine Learning",
    excerpt: "Exploring the challenges and solutions for deploying large language models in production environments. From prompt engineering to vector databases, here's what I learned building real-world LLM applications...",
    readMoreUrl: "#",
    categoryColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  },
  {
    id: 2,
    title: "AI-Powered Threat Detection: The Future of SOC Operations",
    date: "January 8, 2024",
    category: "Cybersecurity",
    excerpt: "How machine learning is revolutionizing Security Operations Centers by reducing false positives and enabling faster threat response. A deep dive into implementing ML-based anomaly detection systems...",
    readMoreUrl: "#",
    categoryColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  },
  {
    id: 3,
    title: "Federated Learning for Healthcare: Privacy-Preserving AI",
    date: "December 20, 2023",
    category: "Data Science",
    excerpt: "Implementing federated learning in healthcare IoT systems while maintaining patient privacy. Lessons learned from building distributed ML models across multiple medical institutions...",
    readMoreUrl: "#",
    categoryColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  }
];

export default function Blog() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="blog" className="section-spacing bg-muted">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-left mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground">
            Thoughts on AI, machine learning, and cybersecurity
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPostCard({ post, index }: { post: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Card
      ref={ref}
      className={cn(
        "hover:shadow-lg transition-shadow duration-300 animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <CardContent className="p-8">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <time dateTime={post.date}>{post.date}</time>
          <span className="mx-2">•</span>
          <Badge className={post.categoryColor}>
            {post.category}
          </Badge>
        </div>
        <h3 className="text-2xl font-bold text-card-foreground mb-4">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <button
          onClick={() => window.open(post.readMoreUrl, "_blank")}
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors duration-200"
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
