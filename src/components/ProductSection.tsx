import { Button } from "@/components/ui/button";
import { BarChart3, Users2, Leaf } from "lucide-react";
import productImage from "@/assets/product-features.jpg";

const ProductSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Impact Tracking",
      description: "Measure and visualize your team's environmental contributions with detailed analytics and beautiful reports.",
      image: productImage
    },
    {
      icon: Users2,
      title: "Team Collaboration",
      description: "Strengthen bonds through meaningful sustainable activities designed to boost engagement and productivity.",
      image: productImage
    },
    {
      icon: Leaf,
      title: "Sustainability Goals",
      description: "Set and achieve meaningful environmental targets while building a culture of responsibility and purpose.",
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
                  Learn More
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