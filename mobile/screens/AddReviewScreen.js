import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { reviewService } from '../services/api';

const AddReviewScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (comment.trim().length < 10) {
      Alert.alert('Validation Error', 'Comment must be at least 10 characters long.');
      return;
    }

    if (rating < 1 || rating > 5) {
      Alert.alert('Validation Error', 'Rating must be between 1 and 5.');
      return;
    }

    try {
      setSubmitting(true);
      await reviewService.create({
        productId,
        comment: comment.trim(),
        rating,
        reviewerName: reviewerName.trim() || undefined,
      });

      Alert.alert('Success', 'Review submitted successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigation will automatically trigger useFocusEffect in ProductDetailScreen
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStarRating = () => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Text style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingText}>{rating} / 5</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Your Name (Optional)</Text>
          <TextInput
            style={styles.input}
            value={reviewerName}
            onChangeText={setReviewerName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Rating</Text>
          {renderStarRating()}

          <Text style={styles.label}>Review Comment *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={comment}
            onChangeText={setComment}
            placeholder="Write your review (minimum 10 characters)"
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {comment.length} / 2000 characters
          </Text>

          <TouchableOpacity
            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Review</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starButton: {
    padding: 8,
  },
  star: {
    fontSize: 32,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  submitButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonDisabled: {
    backgroundColor: '#999',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddReviewScreen;


