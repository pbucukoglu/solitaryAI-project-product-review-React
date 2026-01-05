import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
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
  useColorScheme,
} from 'react-native';
import { reviewService } from '../services/api';

import OfflineBanner from '../components/OfflineBanner';
import { createTheme } from '../components/theme';

const AddReviewScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const colorScheme = useColorScheme();
  const theme = useMemo(() => createTheme(colorScheme), [colorScheme]);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const starScales = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(1))).current;

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
            onPress={() => {
              setRating(star);
              const idx = star - 1;
              Animated.sequence([
                Animated.spring(starScales[idx], {
                  toValue: 1.18,
                  useNativeDriver: true,
                  speed: 22,
                  bounciness: 10,
                }),
                Animated.spring(starScales[idx], {
                  toValue: 1,
                  useNativeDriver: true,
                  speed: 18,
                  bounciness: 8,
                }),
              ]).start();
            }}
            style={styles.starButton}
          >
            <Animated.Text style={[styles.star, { transform: [{ scale: starScales[star - 1] }] }]}>
              {star <= rating ? '⭐' : '☆'}
            </Animated.Text>
          </TouchableOpacity>
        ))}
        <Text style={[styles.ratingText, { color: theme.colors.text }]}>{rating} / 5</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <OfflineBanner theme={theme} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={[styles.form, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
          <Text style={[styles.label, { color: theme.colors.text }]}>Your Name (Optional)</Text>
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt }]}
            value={reviewerName}
            onChangeText={setReviewerName}
            placeholder="Enter your name"
            placeholderTextColor={theme.colors.textSecondary}
          />

          <Text style={[styles.label, { color: theme.colors.text }]}>Rating</Text>
          {renderStarRating()}

          <Text style={[styles.label, { color: theme.colors.text }]}>Review Comment *</Text>
          <TextInput
            style={[styles.input, styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt }]}
            value={comment}
            onChangeText={setComment}
            placeholder="Write your review (minimum 10 characters)"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <Text style={[styles.charCount, { color: theme.colors.textSecondary }]}>
            {comment.length} / 2000 characters
          </Text>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }, submitting && styles.submitButtonDisabled]}
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
  },
  scrollContent: {
    padding: 20,
  },
  form: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
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
    marginLeft: 16,
  },
  submitButton: {
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


