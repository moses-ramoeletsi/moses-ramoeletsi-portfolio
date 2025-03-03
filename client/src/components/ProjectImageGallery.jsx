import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';

const ProjectImageGallery = ({ mainImage, otherImages = [], onAddImages }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = mainImage ? [mainImage, ...(otherImages || [])] : [];

  // Guard against empty image arrays
  if (allImages.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setShowGallery(false);
  };

  return (
    <div className="relative">
      {/* Main image that opens gallery */}
      <div 
        className="cursor-pointer relative group"
        onClick={() => setShowGallery(true)}
      >
        <img 
          src={mainImage} 
          alt="Project"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {otherImages?.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
            +{otherImages.length} more
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setShowGallery(false)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div 
            className="relative max-w-4xl w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            {/* Main image container */}
            <div className="relative">
              <img
                src={allImages[currentIndex]}
                alt={`Project image ${currentIndex + 1}`}
                className="w-full max-h-[70vh] object-contain"
              />

              {/* Navigation buttons - only show if more than one image */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full">
                {currentIndex + 1} / {allImages.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-16 h-16 flex-shrink-0 cursor-pointer border-2 ${
                    currentIndex === idx ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {onAddImages && (
                <div
                  onClick={onAddImages}
                  className="w-16 h-16 flex-shrink-0 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-gray-600"
                  aria-label="Add more images"
                >
                  <Plus size={24} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectImageGallery;