import React, { useState, useEffect, useRef } from 'react';
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
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { productService } from '../services/api';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('ASC');
  const [showFilters, setShowFilters] = useState(false);
  const [categories] = useState(['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports & Outdoors']);

  const loadProducts = async (pageNum = 0, append = false, overrideFilters = null) => {
    try {
      setLoading(pageNum === 0);
      // Use override filters if provided (from timer), otherwise use current state
      const filters = overrideFilters || {
        sortBy,
        sortDir,
        selectedCategory,
        searchQuery
      };
      
      // DEBUG: Log what we're sending to API
      const debugInfo = {
        pageNum,
        append,
        overrideFilters: overrideFilters !== null,
        filters: {
          sortBy: filters.sortBy,
          sortDir: filters.sortDir,
          category: filters.selectedCategory,
          search: filters.searchQuery
        },
        currentState: {
          sortBy,
          sortDir,
          selectedCategory,
          searchQuery
        }
      };
      console.log('🔍 [ProductList] loadProducts called with:', JSON.stringify(debugInfo, null, 2));
      
      const response = await productService.getAll(
        pageNum, 
        20, 
        filters.sortBy, 
        filters.sortDir, 
        filters.selectedCategory, 
        filters.searchQuery || null
      );
      
      // DEBUG: Log response
      console.log('✅ [ProductList] API Response:', {
        totalElements: response.totalElements,
        productsCount: response.content?.length || 0,
        firstProduct: response.content?.[0]?.name || 'none',
        allProductNames: response.content?.map(p => p.name).join(', ') || 'none'
      });
      
      if (append) {
        setProducts(prev => [...prev, ...response.content]);
      } else {
        setProducts(response.content);
      }
      
      setHasMore(!response.last);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', `Failed to load products. ${error.message || 'Please check your connection.'}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Track previous values to detect changes
  const prevFiltersRef = useRef({ selectedCategory: null, sortBy: 'id', sortDir: 'ASC', searchQuery: '' });
  const isFirstMount = useRef(true);
  
  // Initial load on mount
  useEffect(() => {
    loadProducts(0, false);
    isFirstMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount
  
  // Combined effect: Load products when filters, sort, or search changes
  useEffect(() => {
    // Skip on first mount (handled above)
    if (isFirstMount.current) {
      return;
    }
    const currentFilters = {
      selectedCategory: selectedCategory,  // Fixed: use selectedCategory instead of category
      sortBy: sortBy,
      sortDir: sortDir,
      searchQuery: searchQuery || ''  // Fixed: use searchQuery instead of search
    };

    // Check if filters actually changed
    const filtersChanged = 
      prevFiltersRef.current.selectedCategory !== currentFilters.selectedCategory ||
      prevFiltersRef.current.sortBy !== currentFilters.sortBy ||
      prevFiltersRef.current.sortDir !== currentFilters.sortDir ||
      prevFiltersRef.current.searchQuery !== currentFilters.searchQuery;

    if (!filtersChanged) {
      return; // No change, skip
    }

    // Determine if this is a search change (user typing)
    const isSearchChange = prevFiltersRef.current.searchQuery !== currentFilters.searchQuery;
    
    // DEBUG: Log filter changes
    console.log('🔄 [ProductList] Filter change detected:', {
      isSearchChange,
      previous: prevFiltersRef.current,
      current: currentFilters,
      willDebounce: isSearchChange && (currentFilters.searchQuery?.length || 0) > 0
    });
    
    // Update ref AFTER capturing values for timer
    prevFiltersRef.current = currentFilters;

    // Debounce only for search, immediate for filters/sort
    // Pass current filters directly to avoid closure issues
    const delay = isSearchChange && (currentFilters.searchQuery?.length || 0) > 0 ? 500 : 0;
    console.log(`⏱️ [ProductList] Setting timer with ${delay}ms delay`);
    
    const timer = setTimeout(() => {
      console.log('⏱️ [ProductList] Timer fired, calling loadProducts with:', currentFilters);
      loadProducts(0, false, currentFilters);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sortBy, sortDir, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts(0, false);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadProducts(page + 1, true);
    }
  };

  const handleSearch = () => {
    // Reset to first page when searching (called on Enter key)
    setPage(0);
    loadProducts(0, false);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setPage(0);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setSortDir('ASC');
    }
    setPage(0);
  };

  const renderProduct = ({ item }) => {
    const firstImage = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null;
    
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      >
        {firstImage && (
          <Image 
            source={{ uri: firstImage }} 
            style={styles.productImage}
            resizeMode="cover"
          />
        )}
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
  };

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
      {/* Search and Filter Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterButtonText}>🔍 Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {(selectedCategory || sortBy !== 'id' || sortDir !== 'ASC') && (
        <View style={styles.activeFilters}>
          {selectedCategory && (
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>Category: {selectedCategory}</Text>
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={styles.filterChipClose}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>
              Sort: {sortBy} ({sortDir})
            </Text>
            <TouchableOpacity onPress={() => { setSortBy('id'); setSortDir('ASC'); }}>
              <Text style={styles.filterChipClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters & Sort</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Category Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Category</Text>
                <View style={styles.categoryContainer}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryChip,
                        selectedCategory === category && styles.categoryChipActive
                      ]}
                      onPress={() => handleCategoryFilter(category)}
                    >
                      <Text style={[
                        styles.categoryChipText,
                        selectedCategory === category && styles.categoryChipTextActive
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Sort Options */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Sort By</Text>
                {['id', 'name', 'price', 'createdAt'].map((field) => (
                  <TouchableOpacity
                    key={field}
                    style={[
                      styles.sortOption,
                      sortBy === field && styles.sortOptionActive
                    ]}
                    onPress={() => handleSort(field)}
                  >
                    <Text style={[
                      styles.sortOptionText,
                      sortBy === field && styles.sortOptionTextActive
                    ]}>
                      {field === 'id' ? 'Default' : field.charAt(0).toUpperCase() + field.slice(1)}
                      {sortBy === field && ` (${sortDir})`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setShowFilters(false);
                  loadProducts(0, false);
                }}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  searchBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  filterChipText: {
    fontSize: 12,
    color: '#1976d2',
    marginRight: 6,
  },
  filterChipClose: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  productInfo: {
    padding: 16,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalClose: {
    fontSize: 24,
    color: '#666',
  },
  modalBody: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipActive: {
    backgroundColor: '#6200ee',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#333',
  },
  categoryChipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sortOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  sortOptionActive: {
    backgroundColor: '#e3f2fd',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  sortOptionTextActive: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  applyButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
