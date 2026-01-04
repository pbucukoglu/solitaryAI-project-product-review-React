package com.productreview.service;

import com.productreview.dto.ProductDTO;
import com.productreview.dto.ProductDetailDTO;
import com.productreview.entity.Product;
import com.productreview.entity.Review;
import com.productreview.repository.ProductRepository;
import com.productreview.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    
    public Page<ProductDTO> getAllProducts(Pageable pageable, String category, String search) {
        Page<Product> products;
        
        if (category != null && !category.isEmpty()) {
            products = productRepository.findByCategory(category, pageable);
        } else if (search != null && !search.isEmpty()) {
            products = productRepository.searchProducts(search, pageable);
        } else {
            products = productRepository.findAll(pageable);
        }
        
        return products.map(this::convertToDTO);
    }
    
    public ProductDetailDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        return convertToDetailDTO(product);
    }
    
    private ProductDTO convertToDTO(Product product) {
        Double avgRating = reviewRepository.findAverageRatingByProductId(product.getId());
        Long reviewCount = reviewRepository.countByProductId(product.getId());
        
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0,
                reviewCount != null ? reviewCount : 0L
        );
    }
    
    private ProductDetailDTO convertToDetailDTO(Product product) {
        List<Review> reviews = reviewRepository.findByProductId(product.getId());
        Double avgRating = reviewRepository.findAverageRatingByProductId(product.getId());
        Long reviewCount = reviewRepository.countByProductId(product.getId());
        
        List<com.productreview.dto.ReviewDTO> reviewDTOs = reviews.stream()
                .map(review -> new com.productreview.dto.ReviewDTO(
                        review.getId(),
                        review.getProduct().getId(),
                        review.getComment(),
                        review.getRating(),
                        review.getReviewerName(),
                        review.getCreatedAt()
                ))
                .collect(Collectors.toList());
        
        return new ProductDetailDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0,
                reviewCount != null ? reviewCount : 0L,
                reviewDTOs
        );
    }
}


