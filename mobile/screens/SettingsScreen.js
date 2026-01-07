import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { theme, themePreference, setThemePreference, fontScale, setFontScale, scaleFont } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(themePreference || 'system');
  const [selectedFontScale, setSelectedFontScale] = useState(fontScale || 1);

  const appName = Constants?.expoConfig?.name || Constants?.manifest?.name || 'Claro';
  const appVersion = Constants?.expoConfig?.version || Constants?.manifest?.version;

  useEffect(() => {
    setSelectedTheme(themePreference || 'system');
  }, [themePreference]);

  useEffect(() => {
    setSelectedFontScale(fontScale || 1);
  }, [fontScale]);

  const applyTheme = async (value) => {
    setSelectedTheme(value);
    await setThemePreference(value);
  };

  const applyFontScale = async (value) => {
    setSelectedFontScale(value);
    await setFontScale(value);
  };

  const themeOptions = [
    { key: 'system', label: 'System default', icon: 'phone-portrait-outline' },
    { key: 'light', label: 'Light', icon: 'sunny-outline' },
    { key: 'dark', label: 'Dark', icon: 'moon-outline' },
  ];

  const fontOptions = [
    { key: 'small', label: 'Small', value: 0.9 },
    { key: 'medium', label: 'Medium', value: 1.0 },
    { key: 'large', label: 'Large', value: 1.15 },
  ];

  const isFontSelected = (value) => Math.abs((selectedFontScale || 1) - value) < 0.01;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Appearance
          </Text>

          <View style={styles.optionGroup}>
            <Text style={[styles.label, { color: theme.colors.textSecondary, fontSize: scaleFont(16) }]}>Theme</Text>
            {themeOptions.map((option) => {
              const selected = selectedTheme === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionRow,
                    {
                      backgroundColor: theme.colors.surfaceAlt,
                      borderColor: selected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  onPress={() => applyTheme(option.key)}
                >
                  <View style={styles.optionRowLeft}>
                    <Ionicons name={option.icon} size={18} color={theme.colors.textSecondary} />
                    <Text style={[styles.optionText, { color: theme.colors.text, fontSize: scaleFont(16) }]}>{option.label}</Text>
                  </View>
                  {selected && <Ionicons name="checkmark" size={20} color={theme.colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.optionGroup}>
            <Text style={[styles.label, { color: theme.colors.textSecondary, fontSize: scaleFont(16) }]}>Font size</Text>
            {fontOptions.map((option) => {
              const selected = isFontSelected(option.value);
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionRow,
                    {
                      backgroundColor: theme.colors.surfaceAlt,
                      borderColor: selected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  onPress={() => applyFontScale(option.value)}
                >
                  <View style={styles.optionRowLeft}>
                    <Ionicons name="text-outline" size={18} color={theme.colors.textSecondary} />
                    <Text style={[styles.optionText, { color: theme.colors.text, fontSize: scaleFont(16) }]}>{option.label}</Text>
                  </View>
                  {selected && <Ionicons name="checkmark" size={20} color={theme.colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About
          </Text>
          <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
            {appName}{appVersion ? ` v${appVersion}` : ''}
          </Text>
          <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
            This app automatically falls back to demo mode when the backend is unavailable.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
  },
  optionGroup: {
    marginBottom: 18,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  optionRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default SettingsScreen;
