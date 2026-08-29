import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Users, Sun, Shirt, Palette } from 'lucide-react';

export const CATEGORY_GROUPS = [
  {
    label: 'Audience',
    icon: Users,
    options: [
      { value: 'women', label: 'Women' },
      { value: 'men', label: 'Men' },
      { value: 'kids', label: 'Kids' },
      { value: 'unisex', label: 'Unisex' },
    ],
  },
  {
    label: 'Season',
    icon: Sun,
    options: [
      { value: 'summer', label: 'Summer' },
      { value: 'winter', label: 'Winter' },
      { value: 'spring', label: 'Spring' },
      { value: 'autumn', label: 'Autumn' },
    ],
  },
  {
    label: 'Apparel',
    icon: Shirt,
    options: [
      { value: 'casual', label: 'Casual Wear' },
      { value: 'formal', label: 'Formal Wear' },
      { value: 'party', label: 'Party Wear' },
      { value: 'ethnic', label: 'Ethnic / Traditional' },
      { value: 'sportswear', label: 'Sportswear' },
      { value: 'outerwear', label: 'Outerwear' },
      { value: 'footwear', label: 'Footwear' },
      { value: 'accessories', label: 'Accessories' },
    ],
  },
  {
    label: 'Design',
    icon: Palette,
    options: [
      { value: 'fashion', label: 'Fashion' },
      { value: 'design', label: 'Design' },
      { value: 'texture', label: 'Texture' },
      { value: 'pattern', label: 'Pattern' },
    ],
  },
];

const ALL_OPTIONS = CATEGORY_GROUPS.flatMap((group) => group.options);

export function getCategoryLabel(value) {
  return ALL_OPTIONS.find((option) => option.value === value)?.label || '';
}

function CategorySelect({ value, onChange, placeholder = 'Select Category', id }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e) => {
      if (!containerRef.current?.contains(e.target)) setIsOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  // Bring the selected row into view when the panel opens.
  useEffect(() => {
    if (!isOpen || !value) return;
    listRef.current?.querySelector('.category-select-option.is-selected')
      ?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, value]);

  const select = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const selectedLabel = getCategoryLabel(value);

  return (
    <div ref={containerRef} className={`category-select ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        id={id}
        className={`category-select-trigger ${selectedLabel ? 'has-value' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="category-select-value">{selectedLabel || placeholder}</span>
        <ChevronDown size={16} className="category-select-chevron" />
      </button>

      {isOpen && (
        <div className="category-select-panel" role="listbox" ref={listRef}>
          {CATEGORY_GROUPS.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div className="category-select-group" key={group.label}>
                <div className="category-select-group-label">
                  <GroupIcon size={13} />
                  <span>{group.label}</span>
                </div>
                {group.options.map((option) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    key={option.value}
                    className={`category-select-option ${option.value === value ? 'is-selected' : ''}`}
                    onClick={() => select(option.value)}
                  >
                    <span>{option.label}</span>
                    {option.value === value && <Check size={15} />}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategorySelect;
