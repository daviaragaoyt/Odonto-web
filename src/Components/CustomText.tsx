import React from 'react';

interface CustomTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({ className, ...props }) => {
  return <span {...props} className={`text ${className}`} />;
};

export default CustomText;
