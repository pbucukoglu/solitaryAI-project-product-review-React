-- Seed 30 additional products with 4-5 high-quality images each
-- Note: V3 migration already added 10 products, this adds 30 more for a total of 40 products
-- Using Unsplash for high-quality product images

-- Electronics (12 additional products)
INSERT INTO products (name, description, category, price, image_urls, created_at) VALUES
('iPad Pro 12.9"', 'Latest iPad with M2 chip and stunning Liquid Retina XDR display.', 'Electronics', 1099.99,
 '["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800", "https://images.unsplash.com/photo-1561154464-82e9adf5c833?w=800", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800", "https://images.unsplash.com/photo-1561154464-82e9adf5c833?w=800", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"]', CURRENT_TIMESTAMP),

('Sony WH-1000XM5 Headphones', 'Industry-leading noise canceling with exceptional sound quality.', 'Electronics', 399.99,
 '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"]', CURRENT_TIMESTAMP),

('Nintendo Switch OLED', 'Enhanced gaming console with vibrant 7-inch OLED screen.', 'Electronics', 349.99,
 '["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800", "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800", "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800"]', CURRENT_TIMESTAMP),

('Canon EOS R6 Mark II', 'Professional mirrorless camera with 24.2MP full-frame sensor.', 'Electronics', 2499.99,
 '["https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800", "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800", "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800"]', CURRENT_TIMESTAMP),

('Apple Watch Series 9', 'Advanced smartwatch with health monitoring and fitness tracking.', 'Electronics', 399.99,
 '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"]', CURRENT_TIMESTAMP),

('Samsung 55" QLED TV', '4K QLED Smart TV with Quantum Dot technology and HDR.', 'Electronics', 1299.99,
 '["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800", "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800", "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800", "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800", "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800"]', CURRENT_TIMESTAMP),

('AirPods Pro 2', 'Active noise cancellation with spatial audio and adaptive EQ.', 'Electronics', 249.99,
 '["https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800"]', CURRENT_TIMESTAMP),

('DJI Mini 4 Pro Drone', 'Compact drone with 4K video and advanced obstacle sensing.', 'Electronics', 759.99,
 '["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800", "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800", "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800", "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800", "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800"]', CURRENT_TIMESTAMP),

('PlayStation 5', 'Next-gen gaming console with ray tracing and 3D audio.', 'Electronics', 499.99,
 '["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800", "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800", "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800"]', CURRENT_TIMESTAMP),

('Xbox Series X', 'Most powerful Xbox console with 4K gaming and fast loading.', 'Electronics', 499.99,
 '["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800", "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800", "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800", "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800"]', CURRENT_TIMESTAMP),

('LG 27" 4K Monitor', 'Ultra HD monitor with HDR10 and USB-C connectivity.', 'Electronics', 349.99,
 '["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800"]', CURRENT_TIMESTAMP),

('Logitech MX Master 3S', 'Premium wireless mouse with precision tracking and ergonomic design.', 'Electronics', 99.99,
 '["https://images.unsplash.com/photo-1527814050087-3793815479db?w=800", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800", "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800", "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800"]', CURRENT_TIMESTAMP);

-- Clothing (8 additional products)
INSERT INTO products (name, description, category, price, image_urls, created_at) VALUES
('Adidas Ultraboost 22', 'Premium running shoes with responsive cushioning.', 'Clothing', 180.00,
 '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"]', CURRENT_TIMESTAMP),

('Patagonia Down Jacket', 'Warm and lightweight down jacket for outdoor adventures.', 'Clothing', 249.99,
 '["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"]', CURRENT_TIMESTAMP),

('The North Face Backpack', 'Durable hiking backpack with multiple compartments.', 'Clothing', 129.99,
 '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"]', CURRENT_TIMESTAMP),

('Ray-Ban Aviator Sunglasses', 'Classic aviator style with UV protection lenses.', 'Clothing', 154.99,
 '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"]', CURRENT_TIMESTAMP),

('Champion Hoodie', 'Comfortable cotton blend hoodie with classic design.', 'Clothing', 59.99,
 '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"]', CURRENT_TIMESTAMP),

('Vans Old Skool', 'Iconic skate shoes with durable canvas and suede.', 'Clothing', 65.00,
 '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"]', CURRENT_TIMESTAMP),

('Tommy Hilfiger Polo Shirt', 'Classic polo shirt with embroidered logo.', 'Clothing', 79.99,
 '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"]', CURRENT_TIMESTAMP),

('New Balance 990v5', 'Premium running shoes with superior comfort and support.', 'Clothing', 185.00,
 '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"]', CURRENT_TIMESTAMP);

-- Books (6 additional products)
INSERT INTO products (name, description, category, price, image_urls, created_at) VALUES
('Design Patterns: Elements of Reusable OOP', 'Gang of Four classic on software design patterns.', 'Books', 54.99,
 '["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"]', CURRENT_TIMESTAMP),

('You Don''t Know JS', 'Deep dive into JavaScript language mechanics.', 'Books', 44.99,
 '["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"]', CURRENT_TIMESTAMP),

('System Design Interview', 'Complete guide to system design interview questions.', 'Books', 34.99,
 '["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"]', CURRENT_TIMESTAMP),

('The Art of Computer Programming', 'Donald Knuth''s comprehensive guide to algorithms.', 'Books', 79.99,
 '["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"]', CURRENT_TIMESTAMP),

('Refactoring: Improving the Design of Existing Code', 'Martin Fowler''s guide to code refactoring.', 'Books', 47.99,
 '["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"]', CURRENT_TIMESTAMP),

('Introduction to Algorithms', 'Comprehensive textbook on algorithms and data structures.', 'Books', 89.99,
 '["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"]', CURRENT_TIMESTAMP);

-- Home & Kitchen (5 additional products)
INSERT INTO products (name, description, category, price, image_urls, created_at) VALUES
('KitchenAid Stand Mixer', 'Professional 5-quart stand mixer with 10 speeds.', 'Home & Kitchen', 379.99,
 '["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"]', CURRENT_TIMESTAMP),

('Nespresso Vertuo Coffee Maker', 'Premium coffee machine with capsule system.', 'Home & Kitchen', 199.99,
 '["https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800", "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800", "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800", "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800", "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800"]', CURRENT_TIMESTAMP),

('Le Creuset Dutch Oven', 'Enameled cast iron 5.5-quart Dutch oven.', 'Home & Kitchen', 349.99,
 '["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"]', CURRENT_TIMESTAMP),

('Vitamix Blender', 'Professional-grade blender with 64-ounce container.', 'Home & Kitchen', 449.99,
 '["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"]', CURRENT_TIMESTAMP),

('Breville Smart Oven', 'Convection toaster oven with 13 cooking functions.', 'Home & Kitchen', 249.99,
 '["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"]', CURRENT_TIMESTAMP);

-- Sports & Outdoors (4 additional products)
INSERT INTO products (name, description, category, price, image_urls, created_at) VALUES
('Peloton Bike', 'Interactive exercise bike with live and on-demand classes.', 'Sports & Outdoors', 1445.00,
 '["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"]', CURRENT_TIMESTAMP),

('Garmin Forerunner 955', 'Advanced GPS running watch with training metrics.', 'Sports & Outdoors', 599.99,
 '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"]', CURRENT_TIMESTAMP),

('Yeti Rambler 30oz', 'Insulated stainless steel tumbler keeps drinks cold or hot.', 'Sports & Outdoors', 45.99,
 '["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800"]', CURRENT_TIMESTAMP),

('Coleman Camping Tent', '4-person dome tent with weatherproof design.', 'Sports & Outdoors', 89.99,
 '["https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800", "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800", "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800", "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800", "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800"]', CURRENT_TIMESTAMP);

