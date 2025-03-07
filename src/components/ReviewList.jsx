
import { useState } from 'react';
import styled from 'styled-components';

const ReviewsContainer = styled.div`
  margin-top: 30px;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  color: var(--primary-color);
`;

const SortSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const Rating = styled.div`
  color: #FFD700;
  font-weight: bold;
`;

const ReviewDate = styled.div`
  color: #777;
  font-size: 0.9rem;
`;

const ReviewContent = styled.p`
  line-height: 1.6;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  color: #666;
`;

const ReviewList = ({ reviews = [] }) => {
  const [sortBy, setSortBy] = useState('date');
  
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'rating-high') {
      return b.rating - a.rating;
    } else if (sortBy === 'rating-low') {
      return a.rating - b.rating;
    }
    return 0;
  });
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <Title>User Reviews ({reviews.length})</Title>
        {reviews.length > 1 && (
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Most Recent</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
          </SortSelect>
        )}
      </ReviewsHeader>
      
      {reviews.length === 0 ? (
        <EmptyMessage>No reviews yet. Be the first to leave a review!</EmptyMessage>
      ) : (
        <ReviewsList>
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <ReviewerInfo>
                  <Avatar>
                    {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                  <UserName>{review.userName || 'Anonymous User'}</UserName>
                </ReviewerInfo>
                <Rating>★ {review.rating}/10</Rating>
              </ReviewHeader>
              <ReviewDate>{formatDate(review.date)}</ReviewDate>
              <ReviewContent>{review.comment}</ReviewContent>
            </ReviewCard>
          ))}
        </ReviewsList>
      )}
    </ReviewsContainer>
  );
};

export default ReviewList;
