import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { productService } from '../services/api';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (pageNum = 0, append = false) => {
    try {
      setLoading(pageNum === 0);
      const response = await productService.getAll(pageNum, 20, 'id', 'ASC');
      
      if (append) {
        setProducts(prev => [...prev, ...response.content]);
      } else {
        setProducts(response.content);
      }
      
      setHasMore(!response.last);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Failed to load products. Please check your connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts(0, false);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadProducts(page + 1, true);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          {item.averageRating > 0 && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>⭐ {item.averageRating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && products.length > 0 ? (
            <ActivityIndicator style={styles.footerLoader} color="#6200ee" />
          ) : null
        }
      />
    </View>
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
  list: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  footerLoader: {
    padding: 20,
  },
});

export default ProductListScreen;


