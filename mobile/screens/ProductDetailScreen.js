import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { productService, reviewService } from '../services/api';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  const loadProductDetails = async () => {
    try {
      setLoading(true);
      const productData = await productService.getById(productId);
      setProduct(productData);
      setReviews(productData.reviews || []);
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    navigation.navigate('AddReview', { 
      productId: productId,
      onReviewAdded: loadProductDetails 
    });
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{item.reviewerName || 'Anonymous'}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingBadgeText}>⭐ {item.rating}/5</Text>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      {item.createdAt && (
        <Text style={styles.reviewDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productSection}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        </View>

        {product.averageRating > 0 && (
          <View style={styles.ratingSection}>
            <Text style={styles.ratingText}>
              ⭐ {product.averageRating.toFixed(1)} / 5.0
            </Text>
            <Text style={styles.reviewCountText}>
              Based on {product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'}
            </Text>
          </View>
        )}

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <TouchableOpacity 
          style={styles.addReviewButton}
          onPress={handleAddReview}
        >
          <Text style={styles.addReviewButtonText}>➕ Add Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reviewsSection}>
        <Text style={styles.reviewsTitle}>
          Reviews ({reviews.length})
        </Text>
        
        {reviews.length > 0 ? (
          <FlatList
            data={reviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.noReviewsContainer}>
            <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
  },
  productSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  priceContainer: {
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  ratingSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reviewCountText: {
    fontSize: 14,
    color: '#666',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  addReviewButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsSection: {
    backgroundColor: '#fff',
    padding: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingBadge: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  noReviewsContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;


