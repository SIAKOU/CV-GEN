import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  const Component = hover ? motion.div : 'div';
  
  return (
    <Component
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-6 transition-colors duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...(hover && {
        whileHover: { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
        transition: { duration: 0.2 },
      })}
    >
      {children}
    </Component>
  );
};
