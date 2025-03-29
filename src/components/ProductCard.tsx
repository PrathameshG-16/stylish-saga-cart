
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  return (
    <div className="group relative overflow-hidden rounded-md bg-gray-50 transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/400x400/e2e8f0/a1a1aa?text=Image';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-700">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full transition-colors"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
