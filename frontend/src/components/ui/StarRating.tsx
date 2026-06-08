import React from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'md'
}) => {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  return (
    <div className={`star-rating rating-${size} ${interactive ? 'interactive' : ''}`}>
      {stars.map((star) => {
        const isFilled = star <= rating;
        const isHalf = !isFilled && star - 0.5 <= rating;

        return (
          <span
            key={star}
            className={`star ${isFilled ? 'filled' : ''} ${isHalf ? 'half' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
