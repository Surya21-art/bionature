import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const AnimatedDropdown = ({
  trigger,
  items,
  className = "",
  contentClassName = "",
  align = "start",
  isActive = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getAlignmentClass = () => {
    switch (align) {
      case "center":
        return "left-1/2 -translate-x-1/2";
      case "end":
        return "right-0";
      default:
        return "left-0";
    }
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className={`flex items-center gap-1 xl:gap-1.5 px-2 py-1 xl:px-2.5 xl:py-1.5 rounded-sm whitespace-nowrap shrink-0 text-stone-700 hover:text-emerald-900 transition-colors duration-150 outline-none ${
          isActive || isOpen ? "text-emerald-900 font-semibold" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{trigger}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-emerald-800" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className={`absolute top-full pt-1.5 ${getAlignmentClass()} z-50`}
        >
          <div
            className={`bg-white border border-stone-200/95 shadow-lg p-1.5 min-w-[240px] max-w-[calc(100vw-32px)] rounded-sm transition-opacity duration-150 ${contentClassName}`}
          >
            <div className="space-y-0.5">
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {item.separator && (
                    <div className="h-px bg-stone-100 my-1.5" />
                  )}

                  {!item.separator && item.href && (
                    <a
                      href={item.href}
                      className="flex items-start gap-2.5 px-3 py-2 rounded-xs text-xs text-stone-700 hover:text-emerald-950 hover:bg-stone-50 transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && (
                        <div className="text-stone-400 group-hover:text-emerald-800 shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-stone-900 group-hover:text-emerald-900">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 bg-stone-100 text-stone-600 text-[10px] font-mono uppercase tracking-wider rounded-xs border border-stone-200">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </a>
                  )}

                  {!item.separator && !item.href && (
                    <button
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left flex items-start gap-2.5 px-3 py-2 rounded-xs text-xs text-stone-700 hover:text-emerald-950 hover:bg-stone-50 transition-colors group"
                    >
                      {item.icon && (
                        <div className="text-stone-400 group-hover:text-emerald-800 shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-stone-900 group-hover:text-emerald-900">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 bg-stone-100 text-stone-600 text-[10px] font-mono uppercase tracking-wider rounded-xs border border-stone-200">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
