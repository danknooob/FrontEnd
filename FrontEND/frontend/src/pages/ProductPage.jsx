// src/App.jsx
import React, { useState } from 'react';

const reviews = [
  { id: 1, name: 'John Doe', comment: 'Great product!', rating: 5 },
  { id: 2, name: 'Jane Smith', comment: 'Good value for money.', rating: 4 },
  { id: 3, name: 'Alice Johnson', comment: 'I am very satisfied with this purchase.', rating: 5 },
  { id: 4, name: 'Michael Brown', comment: 'The quality is excellent.', rating: 4 },
  { id: 5, name: 'Emily Davis', comment: 'Fast shipping and great packaging.', rating: 5 },
  { id: 6, name: 'Chris Wilson', comment: 'Exceeded my expectations!', rating: 5 },
  { id: 7, name: 'Sarah Martinez', comment: 'Highly recommend this product.', rating: 4 },
  { id: 8, name: 'David Anderson', comment: 'Works as described.', rating: 4 },
  { id: 9, name: 'Laura Taylor', comment: 'Very good product, will buy again.', rating: 5 },
  { id: 10, name: 'James Moore', comment: 'Not bad, but could be better.', rating: 3 },
];

const ProductPage = () => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [userReviews, setUserReviews] = useState(reviews);

  const handleAddReview = () => {
    if (newComment && newRating) {
      const newReview = {
        id: userReviews.length + 1,
        name: 'Anonymous', // You can also add a name input if needed
        comment: newComment,
        rating: newRating,
      };
      setUserReviews([...userReviews, newReview]);
      setNewComment('');
      setNewRating(0);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-lg">
        <figure className="px-10 pt-10">
          <img src="/path/to/product-image.jpg" alt="Product" className="rounded-xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Product Name</h2>
          <p className="text-lg">Description of the product goes here.</p>
          <p className="text-xl font-bold">$199.99</p>
          <div className="my-4">
            <h3 className="text-lg font-bold">User Reviews</h3>
            <div className="space-y-4">
              {userReviews.map((review) => (
                <div key={review.id} className="border p-4 rounded">
                  <p className="font-semibold">{review.name}</p>
                  <p>{review.comment}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${review.id}`}
                        className={`mask mask-star-2 bg-yellow-500 ${i < review.rating ? 'checked' : ''}`}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h3 className="text-lg font-bold">Add Your Review</h3>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="rating mt-2">
              {[...Array(5)].map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name="rating"
                  className={`mask mask-star-2 bg-yellow-500 ${i < newRating ? 'checked' : ''}`}
                  onClick={() => setNewRating(i + 1)}
                />
              ))}
            </div>
            <button className="btn btn-primary mt-4" onClick={handleAddReview}>
              Add Your Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
