
import { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Title = styled.h3`
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RatingLabel = styled.label`
  font-weight: 500;
`;

const StarContainer = styled.div`
  display: flex;
`;

const Star = styled.span`
  font-size: 24px;
  color: ${props => (props.active ? '#FFD700' : '#e4e5e9')};
  cursor: pointer;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  align-self: flex-start;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ReviewForm = ({ movieId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      alert('Please enter a comment');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here we would typically send the review to a backend
      // For this example, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onReviewSubmit({
        rating,
        comment,
        movieId,
        date: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      });
      
      // Reset form
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FormContainer>
      <Title>Write a Review</Title>
      <Form onSubmit={handleSubmit}>
        <RatingContainer>
          <RatingLabel>Your Rating:</RatingLabel>
          <StarContainer>
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                active={i < (hoverRating || rating)}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </Star>
            ))}
          </StarContainer>
        </RatingContainer>
        
        <TextArea
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ReviewForm;
