package com.productreview.repository;

import com.productreview.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    Page<Product> findByCategory(String category, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:searchTerm% OR p.description LIKE %:searchTerm%")
    Page<Product> searchProducts(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.category = :category AND (p.name LIKE %:searchTerm% OR p.description LIKE %:searchTerm%)")
    Page<Product> findByCategoryAndSearch(@Param("category") String category, @Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.reviews WHERE p.id = :id")
    Optional<Product> findByIdWithReviews(@Param("id") Long id);
}


