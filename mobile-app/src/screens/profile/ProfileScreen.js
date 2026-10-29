import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { APP_VERSION, MENU_ITEMS } from '../../constants/profile';
import { useProfile } from '../../hooks/useProfile';
import ProfileHeaderCard from '../../components/profile/ProfileHeaderCard';
import MenuRow from '../../components/profile/MenuRow';
import LogoutButton from '../../components/profile/LogoutButton';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function ProfileScreen({ navigation }) {
  const { user, loading, error, reload, signOut, loggingOut } = useProfile();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await reload();
    } finally {
      setRefreshing(false);
    }
  }, [reload]);

  const handleItemPress = useCallback(
    (item) => {
      if (!item.route) return;
      navigation?.navigate(item.route);
    },
    [navigation]
  );

  const handleLogoutConfirm = useCallback(async () => {
    await signOut();
    setLogoutVisible(false);
    // TODO: navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
  }, [signOut]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>SafeRide</Text>
          <Text style={styles.headerSub}>Profile</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {user?.connected ? 'Connected' : 'Offline'}
            </Text>
          </View>
          <View style={styles.headerAvatar}>
            <MaterialIcons name="person" size={18} color={theme.colors.onPrimary} />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading && !user ? (
          <View style={styles.center}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>Couldn’t load profile.</Text>
          </View>
        ) : (
          <>
            <ProfileHeaderCard user={user} />

            <View style={styles.menuCard}>
              {MENU_ITEMS.map((item, idx) => (
                <MenuRow
                  key={item.key}
                  item={item}
                  isLast={idx === MENU_ITEMS.length - 1}
                  onPress={() => handleItemPress(item)}
                />
              ))}
            </View>

            <View style={styles.logoutWrap}>
              <LogoutButton onPress={() => setLogoutVisible(true)} />
              <Text style={styles.version}>SafeRide • {APP_VERSION}</Text>
            </View>
          </>
        )}
      </ScrollView>

      <ConfirmModal
        visible={logoutVisible}
        icon="logout"
        title="Log Out"
        message="Are you sure you want to log out of SafeRide?"
        cancelLabel="Cancel"
        confirmLabel="Log Out"
        confirmStyle="danger"
        busy={loggingOut}
        onCancel={() => setLogoutVisible(false)}
        onConfirm={handleLogoutConfirm}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.surface },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
  },
  brand: { ...theme.typography.headlineSm, color: theme.colors.primary },
  headerSub: { ...theme.typography.labelSm, color: theme.colors.onSurfaceVariant, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(134, 249, 188, 0.5)',
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.secondary },
  statusText: { ...theme.typography.labelSm, color: theme.colors.onSecondaryFixedVariant },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { padding: 16, gap: 16, paddingBottom: 96 },
  menuCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutWrap: { alignItems: 'center', gap: 16, marginTop: 4 },
  version: { ...theme.typography.labelSm, color: theme.colors.onSurfaceVariant, opacity: 0.6 },
  center: { padding: 40, alignItems: 'center' },
  errorText: { ...theme.typography.bodySm, color: theme.colors.error },
});