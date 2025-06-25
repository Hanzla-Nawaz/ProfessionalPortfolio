import Navigation from "@/components/navigation";
import ModelShowcase from "@/components/model-showcase";
import Footer from "@/components/footer";

export default function ModelShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-20">
        <ModelShowcase />
      </div>
      <Footer />
    </div>
  );
}