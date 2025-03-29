
import { useState } from "react";

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPalette = ({ selectedColor, onSelectColor }: ColorPaletteProps) => {
  const colorOptions = [
    // Basic colors
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    // Extended palette
    "#FFC107", "#FF9800", "#FF5722", "#F44336", "#E91E63",
    "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
    "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
    "#FFEB3B", "#795548", "#9E9E9E", "#607D8B", "#F5F5F5"
  ];

  const [customColor, setCustomColor] = useState(selectedColor);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
    onSelectColor(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <h3 className="font-medium mb-3">Colors</h3>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {colorOptions.map((color) => (
          <button
            key={color}
            className={`w-full aspect-square rounded-md border ${
              color === selectedColor ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Custom Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="h-10 w-10 cursor-pointer border rounded"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              onSelectColor(e.target.value);
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
