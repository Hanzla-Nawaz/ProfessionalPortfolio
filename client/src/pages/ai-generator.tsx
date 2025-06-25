import Navigation from "@/components/navigation";
import AIGenerator from "@/components/ai-generator";
import Footer from "@/components/footer";

export default function AIGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-20">
        <AIGenerator />
      </div>
      <Footer />
    </div>
  );
}