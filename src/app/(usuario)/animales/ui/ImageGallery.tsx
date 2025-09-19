"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface ImageItem {
  id?: string;
  url: string;
}

interface ImageGalleryProps {
  visible: boolean;
  images: ImageItem[];
  onClose: () => void;
  onDelete?: (imageId: string) => void;
}

const ImageGallery = ({
  visible,
  images,
  onClose,
  onDelete,
}: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!visible || !images || images.length === 0) return null;

  const prevImage = () => setCurrentIndex(Math.max(0, currentIndex - 1));
  const nextImage = () =>
    setCurrentIndex(Math.min(images.length - 1, currentIndex + 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-[95vw] max-w-[800px] h-[85vh] bg-background rounded-xl overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 bg-black bg-opacity-70">
          <span className="text-white font-bold">
            {currentIndex + 1} de {images.length}
          </span>
          <button onClick={onClose} className="p-1">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <img
            src={images[currentIndex].url.replace(
              "localhost",
              process.env.NEXT_PUBLIC_HOST || "192.168.0.10"
            )}
            alt={`Imagen ${currentIndex + 1}`}
            className="object-contain max-h-full max-w-full"
          />
          {onDelete && images[currentIndex].id && (
            <button
              onClick={() => onDelete(images[currentIndex].id!)}
              className="absolute bottom-4 right-4 p-2 bg-white rounded-full"
            >
              <Trash2 size={20} className="text-red-600" />
            </button>
          )}
        </div>

        <button
          onClick={prevImage}
          disabled={currentIndex === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full disabled:opacity-30"
        >
          <ChevronLeft size={30} className="text-white" />
        </button>
        <button
          onClick={nextImage}
          disabled={currentIndex === images.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full disabled:opacity-30"
        >
          <ChevronRight size={30} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
