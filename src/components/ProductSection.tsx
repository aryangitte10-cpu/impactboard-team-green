import { Button } from "@/components/ui/button";
import { BarChart3, Users2, Leaf } from "lucide-react";
import productImage from "@/assets/product-features.jpg";

const ProductSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Forest Restoration Challenge",
      description: "Join teams in planting native trees and restoring local ecosystems while building teamwork skills.\n\nBerlin, Germany\nHalf day • 12-50 people",
      image: productImage
    },
    {
      icon: Users2,
      title: "Ocean Cleanup Expedition",
      description: "Combine marine conservation with team building through beach cleanups and water quality testing.\n\nHamburg, Germany\nFull day • 8-30 people",
      image: productImage
    },
    {
      icon: Leaf,
      title: "Wildlife Habitat Building",
      description: "Create homes for local wildlife while developing problem-solving and collaboration skills.\n\nMunich, Germany\nHalf day • 6-25 people",
      image: productImage
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Product Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how Impactboard combines team building with sustainability to create lasting positive change.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Button variant="outline" className="w-full">
                  + Book Activity
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;