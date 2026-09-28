import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import DriveCard from '../components/DriveCard';
import { drives } from '../data/mockDrives';
import { useApp } from '../context/AppContext';
import useEligibility from '../hooks/useEligibility';
import { colors } from '../utils/theme';

const TABS = [
  { key: 'all', label: 'All Drives' },
  { key: 'eligible', label: 'Eligible Only' },
];

export default function DriveListScreen({ navigation }) {
  const [tab, setTab] = useState('all');
  const { isApplied } = useApp();
  const check = useEligibility();

  const items = useMemo(
    () =>
      drives
        .filter((d) => d.status === 'active')
        .map((drive) => ({ drive, eligible: check(drive).eligible })),
    [check],
  );
  const visible = tab === 'eligible' ? items.filter((i) => i.eligible) : items;

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <Pressable
            key={t.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === t.key }}
            onPress={() => setTab(t.key)}
            style={[styles.tab, tab === t.key && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={visible}
        keyExtractor={(i) => i.drive.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No drives match this filter.</Text>
        }
        renderItem={({ item }) => (
          <DriveCard
            drive={item.drive}
            eligible={item.eligible}
            applied={isApplied(item.drive.id)}
            onPress={() => navigation.navigate('DriveDetail', { driveId: item.drive.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  tabs: { flexDirection: 'row', padding: 12, gap: 8 },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { fontWeight: '600', color: colors.text },
  tabTextActive: { color: '#fff' },
  list: { padding: 12, paddingTop: 0 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40 },
});
