
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPlaceholder } from "@/utils/imageUtils";

interface DesignTemplatesProps {
  onSelectTemplate: (templateUrl: string) => void;
}

const DesignTemplates = ({ onSelectTemplate }: DesignTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const templateCategories = {
    tShirts: [
      {
        id: "tshirt-1",
        name: "Classic T-Shirt",
        image: "/img/white-tee.jpg"
      },
      {
        id: "tshirt-2",
        name: "V-Neck T-Shirt",
        image: createPlaceholder(200, 200, "V-Neck")
      }
    ],
    hoodies: [
      {
        id: "hoodie-1",
        name: "Pullover Hoodie",
        image: createPlaceholder(200, 200, "Hoodie")
      },
      {
        id: "hoodie-2",
        name: "Zip-Up Hoodie",
        image: createPlaceholder(200, 200, "Zip Hoodie")
      }
    ],
    accessories: [
      {
        id: "accessory-1",
        name: "Tote Bag",
        image: "/img/tote.jpg"
      },
      {
        id: "accessory-2",
        name: "Cap",
        image: createPlaceholder(200, 200, "Cap")
      }
    ]
  };

  const handleSelectTemplate = (templateUrl: string) => {
    setSelectedTemplate(templateUrl);
    onSelectTemplate(templateUrl);
  };
  
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <h3 className="font-medium mb-3">Templates</h3>
      
      <Tabs defaultValue="tShirts">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="tShirts">T-Shirts</TabsTrigger>
          <TabsTrigger value="hoodies">Hoodies</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>
        
        {Object.entries(templateCategories).map(([category, templates]) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className={`
                    cursor-pointer border rounded-md overflow-hidden bg-gray-50
                    ${selectedTemplate === template.image ? 'ring-2 ring-blue-500' : ''}
                  `}
                  onClick={() => handleSelectTemplate(template.image)}
                >
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src={template.image} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-sm font-medium">{template.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DesignTemplates;
