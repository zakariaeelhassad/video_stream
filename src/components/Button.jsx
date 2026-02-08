import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', loading, disabled, className = '', ...props }) => {
  const baseClass = 'px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center';
  const variantClass = variant === 'primary'
    ? 'bg-brand text-white hover:bg-brand-hover'
    : 'bg-bg-hover text-text-primary hover:bg-bg-secondary';

  const disabledClass = (loading || disabled) ? 'opacity-70 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClass} ${variantClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={20} /> : children}
    </button>
  );
};

export default Button;
