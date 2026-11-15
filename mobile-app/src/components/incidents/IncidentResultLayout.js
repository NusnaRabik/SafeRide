
import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { fonts } from '../../constants/theme';
import PulseDot from './PulseDot';

const NAVY = '#123b5d';

const TONES = {
  safe: {
    bannerBg: '#ecfdf5',
    bannerBorder: '#86efac',
    accent: '#10b981',
    bannerText: '#047857',
    labelText: '#047857',
    ringBorder: 'rgba(134,239,172,0.8)',
    ringFill: 'rgba(236,253,245,0.4)',
    bannerIcon: 'check',
    eyebrowColor: '#64748b',
    eyebrowCaps: false,
    titleSize: 32,
    ringOuter: 256,
    ringInner: 200,
  },
  danger: {
    bannerBg: '#fef2f2',
    bannerBorder: '#fecaca',
    accent: '#dc2626',
    bannerText: '#b91c1c',
    labelText: '#dc2626',
    ringBorder: 'rgba(252,165,165,0.7)',
    ringFill: 'rgba(254,242,242,0.6)',
    bannerIcon: 'warning',
    eyebrowColor: '#dc2626',
    eyebrowCaps: true,
    titleSize: 28,
    ringOuter: 240,
    ringInner: 192,
  },
};

export default function IncidentResultLayout({
  tone = 'safe',
  bannerText,
  eyebrow,
  title,
  description,
  ringIcon,
  ringLabel,
  onReturn,
  children,
}) {
  const t = TONES[tone] || TONES.safe;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>

      {/* System strip */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerDot} />
          <Text style={styles.headerTitle}>SAFERIDE OS</Text>
        </View>
        <Text style={styles.headerRight}>SYSTEM OK</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Status banner */}
        <View
          style={[
            styles.banner,
            {
              backgroundColor: t.bannerBg,
              borderColor: t.bannerBorder,
            },
          ]}
        >
          <View style={styles.bannerLeft}>
            <View
              style={[
                styles.bannerIcon,
                { backgroundColor: t.accent },
              ]}
            >
              <MaterialIcons
                name={t.bannerIcon}
                size={16}
                color="#fff"
              />
            </View>

            <Text
              style={[
                styles.bannerText,
                { color: t.bannerText },
              ]}
            >
              {bannerText}
            </Text>
          </View>

          <PulseDot color={t.accent} size={10} />
        </View>

        {/* Heading */}
        <View style={styles.heading}>
          <Text
            style={[
              styles.eyebrow,
              { color: t.eyebrowColor },
              t.eyebrowCaps && {
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontFamily: fonts.manropeBold,
              },
            ]}
          >
            {eyebrow}
          </Text>

          <Text
            style={[
              styles.title,
              {
                fontSize: t.titleSize,
                lineHeight: t.titleSize + 6,
              },
            ]}
          >
            {title}
          </Text>

          <Text style={styles.description}>
            {description}
          </Text>
        </View>

        {/* Status ring */}
        <View style={styles.ringSection}>
          <View
            style={[
              styles.ringOuter,
              {
                width: t.ringOuter,
                height: t.ringOuter,
                borderRadius: t.ringOuter / 2,
              },
            ]}
          >
            <View
              style={[
                styles.ringInner,
                {
                  width: t.ringInner,
                  height: t.ringInner,
                  borderRadius: t.ringInner / 2,
                  borderColor: t.ringBorder,
                  backgroundColor: t.ringFill,
                },
              ]}
            >
              <View
                style={[
                  styles.iconBadge,
                  { borderColor: t.accent },
                ]}
              >
                <MaterialIcons
                  name={ringIcon}
                  size={34}
                  color={t.accent}
                />
              </View>

              <Text
                style={[
                  styles.ringLabel,
                  { color: t.labelText },
                ]}
              >
                {ringLabel}
              </Text>
            </View>
          </View>
        </View>

        {/* Return button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={onReturn}
          accessibilityRole="button"
          accessibilityLabel="Return to active ride"
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              RETURN TO ACTIVE RIDE
            </Text>

            <MaterialIcons
              name="two-wheeler"
              size={22}
              color="#fff"
            />
          </View>
        </Pressable>

        {children}

        {/* Footer */}
        <Text style={styles.footer}>
          SafeRide Helmet Crash Protection • SafeRide ID #9042
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f9f9ff',
  },

  header: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,232,240,0.7)',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: NAVY,
  },

  headerTitle: {
    fontFamily: fonts.manropeExtra,
    fontSize: 12,
    letterSpacing: 1,
    color: NAVY,
  },

  headerRight: {
    fontFamily: fonts.manropeSemi,
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#94a3b8',
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 24,
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  bannerIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bannerText: {
    fontFamily: fonts.manropeExtra,
    fontSize: 14,
    letterSpacing: 0.6,
    flexShrink: 1,
  },

  heading: {
    alignItems: 'center',
    gap: 8,
  },

  eyebrow: {
    fontFamily: fonts.manropeSemi,
    fontSize: 13,
  },

  title: {
    fontFamily: fonts.manropeExtra,
    color: NAVY,
    letterSpacing: -0.5,
    textAlign: 'center',
  },

  description: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    textAlign: 'center',
    maxWidth: 320,
  },

  ringSection: {
    alignItems: 'center',
    paddingVertical: 4,
  },

  ringOuter: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#123b5d',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  ringInner: {
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  iconBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  ringLabel: {
    fontFamily: fonts.manropeExtra,
    fontSize: 12,
    letterSpacing: 0.8,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    lineHeight: 17,
    flexShrink: 1,
  },

  button: {
    backgroundColor: NAVY,
    borderRadius: 16,
    minHeight: 58,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: NAVY,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 8,
  },

  buttonText: {
    fontFamily: fonts.manropeExtra,
    fontSize: 14,
    letterSpacing: 0.5,
    color: '#fff',
    textAlign: 'center',
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  footer: {
    fontFamily: fonts.manropeSemi,
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
