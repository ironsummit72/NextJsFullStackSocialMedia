import React from 'react';

interface VideotapeIconProps {
  className?: string;
}

const VideotapeIcon: React.FC<VideotapeIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m2 8h20" />
      <path d="M8 4v16" />
      <path d="m16 4v16" />
      <path d="m2 12h6" />
      <path d="m16 12h6" />
    </svg>
  );
};

export default VideotapeIcon;