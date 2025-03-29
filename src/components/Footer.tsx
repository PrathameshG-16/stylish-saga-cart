
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">ESSENCE</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Contemporary clothing for the modern individual. Timeless designs that transcend seasons.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                contact@essence.com
              </li>
              <li className="text-sm text-gray-600">
                +1 (555) 123-4567
              </li>
              <li className="text-sm text-gray-600">
                123 Fashion Street, Style City
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {currentYear} ESSENCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
