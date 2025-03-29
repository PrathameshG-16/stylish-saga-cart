
import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  // Take first 3 products for featured section
  const featuredProducts = products.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At ESSENCE, we believe in creating timeless pieces that transcend seasonal trends.
            Our clothing is designed with quality and sustainability in mind, ensuring each garment
            stands the test of time both in style and durability.
          </p>
        </div>
        
        <FeaturedCollection 
          title="Featured Collection" 
          products={featuredProducts} 
        />
      </div>
      
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Crafted with Care</h2>
              <p className="text-gray-600 mb-4">
                Every piece in our collection is thoughtfully designed and crafted with the finest materials.
                We partner with ethical manufacturers who share our commitment to quality and sustainability.
              </p>
              <p className="text-gray-600">
                From the initial sketch to the final stitch, attention to detail is at the heart of everything we do.
              </p>
            </div>
            <div className="relative h-96 overflow-hidden rounded-lg">
              <img 
                src="/img/craftsmanship.jpg" 
                alt="Craftsmanship" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/800x600/e2e8f0/a1a1aa?text=Craftsmanship';
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
