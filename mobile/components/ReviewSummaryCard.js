import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Skeleton from './Skeleton';

const ReviewSummaryCard = ({
  loading,
  summary,
  source,
  error,
  onRetry,
  empty,
}) => {
  const { theme } = useTheme();

  const title = useMemo(() => {
    if (source === 'gemini') return 'AI Review Summary';
    return 'Review Summary';
  }, [source]);

  if (loading) {
    return (
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          <View style={styles.badge}>
            <Skeleton height={16} width={60} radius={999} baseColor={theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} highlightColor={theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'} />
          </View>
        </View>
        <Skeleton height={12} width={'92%'} radius={10} baseColor={theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} highlightColor={theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'} />
        <View style={{ height: 10 }} />
        <Skeleton height={12} width={'84%'} radius={10} baseColor={theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} highlightColor={theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'} />
        <View style={{ height: 16 }} />
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <Skeleton height={10} width={'96%'} radius={10} baseColor={theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} highlightColor={theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'} />
          </View>
        ))}
      </View>
    );
  }

  if (empty) {
    return (
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        </View>
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No reviews yet.
        </Text>
      </View>
    );
  }

  if (!summary) {
    return (
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        </View>
        {!!error && (
          <Text style={[styles.errorText, { color: theme.colors.danger }]}>{error}</Text>
        )}
        {!!onRetry && (
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={onRetry}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}> 
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <View
          style={[
            styles.sourcePill,
            {
              backgroundColor: source === 'gemini' ? theme.colors.primary : theme.colors.surfaceAlt,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.sourceText, { color: source === 'gemini' ? '#fff' : theme.colors.textSecondary }]}> 
            {source === 'gemini' ? 'Gemini' : 'Local'}
          </Text>
        </View>
      </View>

      {!!summary.takeaway && (
        <Text style={[styles.takeaway, { color: theme.colors.text }]}>{summary.takeaway}</Text>
      )}

      {(summary.pros?.length || 0) > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>Pros</Text>
          {summary.pros.map((p, idx) => (
            <Text key={`p-${idx}`} style={[styles.bullet, { color: theme.colors.textSecondary }]}>
              - {p}
            </Text>
          ))}
        </View>
      )}

      {(summary.cons?.length || 0) > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>Cons</Text>
          {summary.cons.map((c, idx) => (
            <Text key={`c-${idx}`} style={[styles.bullet, { color: theme.colors.textSecondary }]}>
              - {c}
            </Text>
          ))}
        </View>
      )}

      {!!error && !!onRetry && (
        <View style={styles.footerRow}>
          <Text style={[styles.footerError, { color: theme.colors.textSecondary }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.inlineRetry, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
            onPress={onRetry}
          >
            <Text style={[styles.inlineRetryText, { color: theme.colors.text }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
  },
  badge: {
    alignItems: 'flex-end',
  },
  sourcePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '800',
  },
  takeaway: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 6,
  },
  errorText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  retryButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 13,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  footerError: {
    flex: 1,
    fontSize: 12,
    marginRight: 12,
  },
  inlineRetry: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  inlineRetryText: {
    fontSize: 12,
    fontWeight: '900',
  },
});

export default ReviewSummaryCard;
