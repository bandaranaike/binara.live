"use client";

import {useMemo, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallery({images}: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const previewIndexes = useMemo(() => {
        const totalPreviewCount = Math.min(6, images.length);
        const windowStart = Math.max(0, Math.min(selectedIndex - 1, images.length - totalPreviewCount));

        return Array.from({length: totalPreviewCount}, (_, index) => windowStart + index);
    }, [images.length, selectedIndex]);

    const selectPrevious = () => {
        setSelectedIndex((currentIndex) => Math.max(0, currentIndex - 1));
    };

    const selectNext = () => {
        setSelectedIndex((currentIndex) => Math.min(images.length - 1, currentIndex + 1));
    };

    const handleTouchStart = (event: React.TouchEvent) => {
        setTouchStartX(event.changedTouches[0].clientX);
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        setTouchEndX(event.changedTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 50) {
            selectPrevious();
        } else if (deltaX < -50) {
            selectNext();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            selectNext();
        } else if (event.key === "ArrowLeft") {
            selectPrevious();
        }
    };

    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_360px]" tabIndex={0} onKeyDown={handleKeyDown}>
            <div
                className="relative overflow-hidden rounded-xl border border-purple-100 bg-white shadow-[0_28px_70px_-42px_rgba(91,33,182,0.28)]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={images[selectedIndex]}
                    alt={`Gallery image ${selectedIndex + 1}`}
                    className="h-[420px] w-full object-cover lg:h-[620px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent p-5 lg:p-6">
                    <div className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
                        Photo {selectedIndex + 1} of {images.length}
                    </div>
                </div>
                <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
                    <button
                        type="button"
                        onClick={selectPrevious}
                        disabled={selectedIndex === 0}
                        className="rounded-full border border-white/40 bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </button>
                    <button
                        type="button"
                        onClick={selectNext}
                        disabled={selectedIndex === images.length - 1}
                        className="rounded-full border border-white/40 bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRightIcon className="h-5 w-5"/>
                    </button>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-2 lg:grid-rows-3">
                {previewIndexes.map((imageIndex) => (
                    <button
                        key={imageIndex}
                        type="button"
                        onClick={() => setSelectedIndex(imageIndex)}
                        className={`group relative overflow-hidden rounded-xl border bg-white text-left shadow-[0_18px_45px_-38px_rgba(91,33,182,0.28)] transition ${
                            selectedIndex === imageIndex
                                ? "border-purple-400 ring-2 ring-purple-200"
                                : "border-purple-100 hover:border-purple-200"
                        }`}
                    >
                        <img
                            src={images[imageIndex]}
                            alt={`Gallery preview ${imageIndex + 1}`}
                            className="h-32 w-full object-cover transition duration-300 group-hover:scale-[1.02] lg:h-full"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent p-3">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                                {String(imageIndex + 1).padStart(2, "0")}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
