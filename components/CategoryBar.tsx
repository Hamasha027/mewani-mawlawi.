'use client';

import { useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  icon: LucideIcon;
  color?: string;
}

interface CategoryBarProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  isPending?: boolean;
}

export default function CategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
  isPending = false,
}: CategoryBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Auto-scroll selected button into center view smoothly
  useEffect(() => {
    const selectedBtn = buttonRefs.current[selectedCategory];
    if (selectedBtn && containerRef.current) {
      selectedBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedCategory]);

  return (
    <div className="w-full relative my-3">
      {/* Hide Scrollbar CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Parent Container (Transparent Background) */}
      <div className="relative w-full bg-transparent p-0">
        <div
          ref={containerRef}
          className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 w-full [-webkit-overflow-scrolling:touch]"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                ref={(el) => {
                  buttonRefs.current[category.id] = el;
                }}
                onClick={() => onSelectCategory(category.id)}
                disabled={isPending}
                style={{ scrollSnapAlign: 'center' }}
                className={`group relative flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-full transition-all duration-200 flex-shrink-0 select-none cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-60 shadow-none ${
                  isSelected
                    ? 'bg-[#000000] text-white font-bold shadow-none'
                    : 'bg-gray-100/80 hover:bg-gray-200/90 text-gray-700 hover:text-black border border-gray-200/70 hover:border-gray-300 font-medium shadow-none'
                }`}
                title={category.name}
              >
                {/* Icon Container */}
                <div
                  className={`flex items-center justify-center p-1 md:p-1.5 rounded-lg md:rounded-full transition-transform duration-200 group-hover:scale-105 ${
                    isSelected ? 'bg-white/15 text-white' : 'bg-white/80 text-gray-700 group-hover:text-black shadow-none'
                  }`}
                >
                  <IconComponent className="w-4 h-4 md:w-4.5 md:h-4.5" />
                </div>

                {/* Category Text Label */}
                <span
                  className={`text-xs md:text-sm whitespace-nowrap tracking-tight transition-colors duration-200 ${
                    isSelected ? 'text-white font-bold' : 'text-gray-700 group-hover:text-black font-semibold'
                  }`}
                >
                  {category.name}
                </span>

                {/* Active Indicator Dot */}
                {isSelected && (
                  <span className="relative flex h-2 w-2 ml-0.5">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
