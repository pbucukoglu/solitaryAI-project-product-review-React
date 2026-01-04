-- Add image_urls column to existing products (if any)
-- This migration handles existing data by setting empty array for products without images
UPDATE products SET image_urls = '[]' WHERE image_urls IS NULL;

