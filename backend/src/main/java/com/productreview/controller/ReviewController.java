package com.productreview.controller;

import com.productreview.dto.CreateReviewDTO;
import com.productreview.dto.ReviewDTO;
import com.productreview.dto.UpdateReviewDTO;
import com.productreview.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {
    
    private final ReviewService reviewService;
    
    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@Valid @RequestBody CreateReviewDTO createReviewDTO) {
        ReviewDTO review = reviewService.createReview(createReviewDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody UpdateReviewDTO updateReviewDTO
    ) {
        try {
            ReviewDTO updated = reviewService.updateReview(reviewId, updateReviewDTO);
            return ResponseEntity.ok(updated);
        } catch (IllegalStateException e) {
            if ("FORBIDDEN".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only edit your own review.");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        } catch (RuntimeException e) {
            if (e.getMessage() != null && e.getMessage().startsWith("Review not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            throw e;
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long reviewId,
            @RequestParam String deviceId
    ) {
        try {
            reviewService.deleteReview(reviewId, deviceId);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            if ("FORBIDDEN".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete your own review.");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        } catch (RuntimeException e) {
            if (e.getMessage() != null && e.getMessage().startsWith("Review not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            throw e;
        }
    }
    
    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<ReviewDTO>> getReviewsByProductId(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir,
            @RequestParam(required = false) Integer minRating
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC") 
                ? Sort.by(sortBy).ascending() 
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ReviewDTO> reviews = reviewService.getReviewsByProductId(productId, pageable, minRating);
        return ResponseEntity.ok(reviews);
    }
}


