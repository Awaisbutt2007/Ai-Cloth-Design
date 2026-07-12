import React, { useState, useRef, useEffect } from 'react';

function CustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    onChange({ target: { value: option } });
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`custom-select-container ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <span className="arrow" />
      </button>
      <ul className="custom-select-options">
        {options.map((option) => (
          <li
            key={option}
            className={`custom-select-option ${option === value ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
