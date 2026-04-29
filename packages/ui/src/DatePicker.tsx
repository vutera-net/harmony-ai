"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { formatDateVN } from './utils/date';

interface DatePickerProps {
  value?: string; // ISO date (yyyy-mm-dd)
  onChange?: (date: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Ngày/Tháng/Năm",
  className = "",
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.showPicker();
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div 
        onClick={handleContainerClick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          relative flex items-center gap-2 px-3 py-2 
          bg-white dark:bg-slate-900 
          border ${isFocused ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-300 dark:border-slate-700'} 
          rounded-lg cursor-pointer transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : 'hover:border-slate-400 dark:hover:border-slate-600'}
        `}
      >
        <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        <span className={`text-sm ${value ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}>
          {value ? formatDateVN(value) : placeholder}
        </span>
        
        <input
          ref={inputRef}
          type="date"
          value={value || ""}
          onChange={handleDateChange}
          disabled={disabled}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
