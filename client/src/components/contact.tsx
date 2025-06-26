import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { FaLinkedin, FaGithub, FaKaggle, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission with EmailJS or Formspree
    // For now, simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const socialLinks = [
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/in/hanzlawatto",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: FaGithub,
      url: "https://github.com/Hanzla-Nawaz",
      color: "bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
    },
    {
      icon: FaKaggle,
      url: "https://www.kaggle.com/hanzlanawaz",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: FaTwitter,
      url: "#",
      color: "bg-blue-400 hover:bg-blue-500"
    }
  ];

  return (
    <section id="contact" className="section-spacing">
      <div className="container">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 animate-on-scroll",
            titleVisible && "animated"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to collaborate or discuss opportunities? Get in touch!
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Contact Form */}
          <ContactForm
            formData={formData}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />

          {/* Contact Info & Social Links */}
          <ContactInfo socialLinks={socialLinks} />
        </div>
      </div>
    </section>
  );
}

function ContactForm({ formData, isSubmitting, onInputChange, onSubmit }: any) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={onInputChange}
            required
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}

function ContactInfo({ socialLinks }: any) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "mt-12 lg:mt-0 animate-on-scroll",
        isVisible && "animated"
      )}
    >
      <Card>
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-card-foreground mb-6">
            Get in Touch
          </h3>

          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <Mail className="text-primary w-6 h-6" />
              <span className="ml-3 text-muted-foreground">hanzlanawaz151@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-primary w-6 h-6" />
              <span className="ml-3 text-muted-foreground">+92 343 402 3151</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-primary w-6 h-6" />
              <span className="ml-3 text-muted-foreground">Lahore, Pakistan</span>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="text-lg font-medium text-card-foreground mb-4">
              Follow Me
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((link: any, index: number) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={index}
                    size="icon"
                    className={cn(
                      "text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
                      link.color
                    )}
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
