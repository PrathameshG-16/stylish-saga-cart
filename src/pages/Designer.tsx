
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesignerCanvas from "@/components/DesignerCanvas";
import ColorPalette from "@/components/ColorPalette";
import DesignTemplates from "@/components/DesignTemplates";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save, ShoppingCart } from "lucide-react";

const Designer = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("canvas");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSaveDesign = () => {
    toast({
      title: "Design Saved",
      description: "Your custom design has been saved successfully!",
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: "Your custom design has been added to your cart!",
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Clothing Designer</h1>
          <p className="mt-2 text-gray-600">Create and customize your own apparel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <DesignerCanvas 
                selectedColor={selectedColor} 
                selectedTemplate={selectedTemplate}
              />
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={handleSaveDesign} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save Design
              </Button>
              <Button onClick={handleAddToCart} variant="default" className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
              </TabsList>
              <TabsContent value="templates" className="mt-4">
                <DesignTemplates onSelectTemplate={setSelectedTemplate} />
              </TabsContent>
              <TabsContent value="colors" className="mt-4">
                <ColorPalette selectedColor={selectedColor} onSelectColor={setSelectedColor} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Designer;
