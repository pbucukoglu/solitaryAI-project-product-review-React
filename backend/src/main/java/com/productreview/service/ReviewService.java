package com.productreview.service;

import com.productreview.dto.CreateReviewDTO;
import com.productreview.dto.ReviewDTO;
import com.productreview.entity.Product;
import com.productreview.entity.Review;
import com.productreview.repository.ProductRepository;
import com.productreview.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    
    public ReviewDTO createReview(CreateReviewDTO createReviewDTO) {
        Product product = productRepository.findById(createReviewDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + createReviewDTO.getProductId()));
        
        Review review = new Review();
        review.setProduct(product);
        review.setComment(createReviewDTO.getComment());
        review.setRating(createReviewDTO.getRating());
        review.setReviewerName(createReviewDTO.getReviewerName() != null && !createReviewDTO.getReviewerName().isEmpty() 
                ? createReviewDTO.getReviewerName() 
                : "Anonymous");
        
        Review savedReview = reviewRepository.save(review);
        
        return convertToDTO(savedReview);
    }
    
    public Page<ReviewDTO> getReviewsByProductId(Long productId, Pageable pageable) {
        return reviewRepository.findByProductId(productId, pageable)
                .map(this::convertToDTO);
    }
    
    private ReviewDTO convertToDTO(Review review) {
        return new ReviewDTO(
                review.getId(),
                review.getProduct().getId(),
                review.getComment(),
                review.getRating(),
                review.getReviewerName(),
                review.getCreatedAt()
        );
    }
}


