import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 mb-4 ${className}`}>
      {label && <label className="text-sm text-text-secondary">{label}</label>}
      <input
        className={`p-4 bg-bg-hover border border-transparent rounded-md text-text-primary text-base transition-all focus:outline-none focus:border-brand focus:bg-bg-hover placeholder-text-muted ${error ? 'border-danger' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
};

export default Input;
