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
                    className="w-full max-h-[600px] rounded-[1.5rem] object-cover shadow-[0_24px_80px_-40px_rgba(91,33,182,0.45)]"
                />
            </div>
            {/* Thumbnails */}
            <div className="relative w-full flex items-center justify-around">
                {/* Left Arrow */}
                {images.length > maxThumbnails && selectedIndex > 0 && (
                    <button
                        className="absolute left-0 z-10 hidden rounded-full border border-purple-100 bg-white/80 p-2 shadow-md lg:block"
                        onClick={() => setSelectedIndex(selectedIndex - 1)}
                    >
                        <ChevronLeftIcon width={24}/>
                    </button>
                )}

                <div className="flex space-x-1 overflow-y-auto py-1 lg:space-x-2 lg:px-12">
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
                                    className={`h-8 w-8 cursor-pointer rounded object-cover transition-all duration-300 lg:h-20 lg:w-20 lg:rounded-xl lg:border-2 ${
                                        selectedIndex === realIndex
                                            ? "scale-105 border-purple-500"
                                            : "border-transparent opacity-80"
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
                        className="absolute right-0 z-10 hidden rounded-full border border-purple-100 bg-white/80 p-2 shadow-md lg:block"
                        onClick={() => setSelectedIndex(selectedIndex + 1)}
                    >
                        <ChevronRightIcon width={24}/>
                    </button>
                )}
            </div>
        </div>
    );
}
