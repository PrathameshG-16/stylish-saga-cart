
import { useEffect, useRef, useState } from "react";
import { Pencil, Eraser, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface DesignerCanvasProps {
  selectedColor: string;
  selectedTemplate: string | null;
}

const DesignerCanvas = ({ selectedColor, selectedTemplate }: DesignerCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Make canvas responsive
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const { width } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = width * 0.75; // 4:3 aspect ratio

      // Need to reset context after resize
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = selectedColor;
        context.lineWidth = lineWidth;
        contextRef.current = context;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Draw template if selected
    if (selectedTemplate && contextRef.current) {
      const image = new Image();
      image.src = selectedTemplate;
      image.onload = () => {
        if (contextRef.current) {
          // Clear canvas first
          contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
          // Draw image centered and scaled to fit
          const scale = Math.min(
            canvas.width / image.width,
            canvas.height / image.height
          ) * 0.8;
          const x = (canvas.width - image.width * scale) / 2;
          const y = (canvas.height - image.height * scale) / 2;
          
          contextRef.current.drawImage(
            image,
            x,
            y,
            image.width * scale,
            image.height * scale
          );
        }
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [selectedTemplate]);

  // Update color when it changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? '#ffffff' : selectedColor;
    }
  }, [selectedColor, tool]);

  // Update line width when it changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  const endDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current && contextRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const handleToolChange = (newTool: 'pencil' | 'eraser') => {
    setTool(newTool);
    if (contextRef.current) {
      contextRef.current.strokeStyle = newTool === 'eraser' ? '#ffffff' : selectedColor;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          className="w-full touch-none cursor-crosshair"
          style={{ backgroundColor: '#ffffff' }}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 items-center justify-between bg-gray-100 p-3 rounded-md">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={tool === 'pencil' ? 'default' : 'outline'} 
            onClick={() => handleToolChange('pencil')}
          >
            <Pencil className="h-4 w-4 mr-1" /> Draw
          </Button>
          <Button 
            size="sm" 
            variant={tool === 'eraser' ? 'default' : 'outline'} 
            onClick={() => handleToolChange('eraser')}
          >
            <Eraser className="h-4 w-4 mr-1" /> Erase
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={clearCanvas}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Clear
          </Button>
        </div>
        
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-sm">Size:</span>
          <Slider
            className="w-24"
            value={[lineWidth]}
            min={1}
            max={20}
            step={1}
            onValueChange={(value) => setLineWidth(value[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignerCanvas;
