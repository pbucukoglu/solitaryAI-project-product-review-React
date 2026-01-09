package com.productreview.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSummaryResponseDTO {
    private Long productId;
    private Long reviewCountUsed;
    private ReviewSummaryDTO summary;
    private String generatedAt;
    private String source;
}
