
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('/img/hero.jpg')" }}
      ></div>
      
      <div className="relative z-20 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            ESSENCE
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-white">
            Contemporary clothing for the modern individual
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/collections">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                Shop Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
