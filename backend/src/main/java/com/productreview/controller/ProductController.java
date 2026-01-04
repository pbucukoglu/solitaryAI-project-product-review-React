package com.productreview.controller;

import com.productreview.dto.ProductDTO;
import com.productreview.dto.ProductDetailDTO;
import com.productreview.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {
    
    private final ProductService productService;
    
    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDir,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search
    ) {
        Sort sort = sortDir.equalsIgnoreCase("DESC") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ProductDTO> products = productService.getAllProducts(pageable, category, search);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> getProductById(@PathVariable Long id) {
        ProductDetailDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
}


