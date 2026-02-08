// src/components/IconInputBox.tsx
import { useState } from 'react';

export type IconType = 'road' | 'house' | 'car' | 'user' | 'clock';

interface IconDisplayProps {
  type: IconType;
}

export interface IconInputBoxProps {
  iconType: IconType;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

// You'll typically use an icon library like React Icons for production.
// For this example, we'll just use emojis or simple text representations.
const IconDisplay = ({ type }: IconDisplayProps) => {
  switch (type) {
    case 'road':
      return <span style={{ fontSize: '24px' }}>🛣️</span>;
    case 'house':
      return <span style={{ fontSize: '24px' }}>🏠</span>;
    case 'car':
      return <span style={{ fontSize: '24px' }}>🚗</span>;
    case 'user':
      return <span style={{ fontSize: '24px' }}>👤</span>;
    case 'clock':
      return <span style={{ fontSize: '24px' }}>⏱️</span>;
    default:
      return <span style={{ fontSize: '24px' }}>❓</span>;
  }
};

const IconInputBox = ({ iconType, placeholder, value, onChange, inputProps }: IconInputBoxProps) => {
  // We're using a local state for the input if no external value/onChange is provided
  // This makes the component more flexible (controlled or uncontrolled)
  const [internalValue, setInternalValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e); // If a parent provides onChange, use it
    } else {
      setInternalValue(e.target.value); // Otherwise, manage internally
    }
  };

  const displayValue = onChange ? value : internalValue; // Use prop value if controlled, else internal

  const { type = 'text', ...restInputProps } = inputProps || {};

  return (
    <div style={styles.whiteBox}>
      <div style={styles.roundedInnerBox}>
        <div style={styles.iconContainer}>
          <IconDisplay type={iconType} />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          style={styles.inputField}
          {...restInputProps}
        />
      </div>
    </div>
  );
};

const styles = {
  whiteBox: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    width: '100%',
    display: 'flex',
    boxSizing: 'border-box' as const,
  },
  roundedInnerBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Slightly off-white for contrast
    borderRadius: '25px', // More rounded for the inner box
    border: '1px solid #e0e0e0',
    padding: '8px 15px',
    gap: '10px', // Space between icon and input
    width: '100%',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px', // Fixed width for consistent icon spacing
    height: '30px',
    color: '#555',
  },
  inputField: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '16px',
    padding: '5px 0',
    flexGrow: 1, // Allows the input to take up available space
    color: '#333',
  },
};

export default IconInputBox;

