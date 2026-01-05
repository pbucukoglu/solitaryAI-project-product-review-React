package com.productreview.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public Page<ProductDTO> getAllProducts(Pageable pageable, String category, String search) {
        Page<Product> products;
        
        boolean hasCategory = category != null && !category.isEmpty();
        boolean hasSearch = search != null && !search.isEmpty();
        
        if (hasCategory && hasSearch) {
            // Both category and search: use combined query
            products = productRepository.findByCategoryAndSearch(category, search, pageable);
        } else if (hasCategory) {
            // Only category filter
            products = productRepository.findByCategory(category, pageable);
        } else if (hasSearch) {
            // Only search
            products = productRepository.searchProducts(search, pageable);
        } else {
            // No filters: get all
            products = productRepository.findAll(pageable);
        }
        
        return products.map(this::convertToDTO);
    }
    
    public ProductDetailDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        return convertToDetailDTO(product);
    }
    
    private List<String> parseImageUrls(String imageUrlsJson) {
        if (imageUrlsJson == null || imageUrlsJson.trim().isEmpty()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(imageUrlsJson, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private ProductDTO convertToDTO(Product product) {
        List<String> imageUrls = parseImageUrls(product.getImageUrls());

        Double avgRating = product.getAverageRating();
        Long reviewCount = product.getReviewCount();
        
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                imageUrls,
                avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0,
                reviewCount != null ? reviewCount : 0L
        );
    }
    
    private ProductDetailDTO convertToDetailDTO(Product product) {
        List<Review> reviews = reviewRepository.findByProductId(product.getId());
        List<String> imageUrls = parseImageUrls(product.getImageUrls());

        Double avgRating = product.getAverageRating();
        Long reviewCount = product.getReviewCount();
        
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
                imageUrls,
                avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0,
                reviewCount != null ? reviewCount : 0L,
                reviewDTOs
        );
    }
}


