"use client";
import {useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallery({images}: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.changedTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.changedTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 50 && selectedIndex > 0) {
            // Swipe right
            setSelectedIndex(selectedIndex - 1);
        } else if (deltaX < -50 && selectedIndex < images.length - 1) {
            // Swipe left
            setSelectedIndex(selectedIndex + 1);
        }
    };


    const handleSelect = (index: number) => {
        setSelectedIndex(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        } else if (e.key === "ArrowLeft" && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const maxThumbnails = Math.min(12, images.length);

    return (
        <div className="w-full flex flex-col items-center space-y-4" tabIndex={0} onKeyDown={handleKeyDown}>
            {/* Selected Large Image */}
            <div
                className="w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={images[selectedIndex]}
                    alt="Selected"
                    className="w-full object-cover rounded-xl shadow-lg max-h-[600px]"
                />
            </div>
            {/* Thumbnails */}
            <div className="relative w-full flex items-center justify-around">
                {/* Left Arrow */}
                {images.length > maxThumbnails && selectedIndex > 0 && (
                    <button
                        className="absolute hidden lg:block left-0 z-10 p-2 bg-white/50 rounded-full shadow-md"
                        onClick={() => setSelectedIndex(selectedIndex - 1)}
                    >
                        <ChevronLeftIcon width={24}/>
                    </button>
                )}

                <div className="flex lg:space-x-2 space-x-1 overflow-y-auto py-1 lg:px-12">
                    {(() => {
                        const half = Math.floor(maxThumbnails / 2);
                        let start = selectedIndex - half;
                        if (start < 0) start = 0;
                        if (start > images.length - maxThumbnails) {
                            start = images.length - maxThumbnails;
                        }
                        const end = start + maxThumbnails;

                        return images.slice(start, end).map((img, i) => {
                            const realIndex = start + i;
                            return (
                                <img
                                    key={realIndex}
                                    src={img}
                                    alt={`Thumbnail ${realIndex}`}
                                    className={`lg:w-20 lg:h-20 w-8 h-8 object-cover lg:rounded-xl rounded cursor-pointer lg:border-2 border-1 transition-all duration-300 ${
                                        selectedIndex === realIndex
                                            ? "border-blue-500 scale-105"
                                            : "border-transparent"
                                    }`}
                                    onClick={() => handleSelect(realIndex)}
                                />
                            );
                        });
                    })()}
                </div>

                {/* Right Arrow */}
                {images.length > maxThumbnails && selectedIndex < images.length - 1 && (
                    <button
                        className="absolute hidden lg:block right-0 z-10 p-2 bg-white/50 rounded-full shadow-md"
                        onClick={() => setSelectedIndex(selectedIndex + 1)}
                    >
                        <ChevronRightIcon width={24}/>
                    </button>
                )}
            </div>
        </div>
    );
}
