import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import useApplications from '../hooks/useApplications';
import { formatDate } from '../utils/formatDate';
import { colors } from '../utils/theme';

export default function MyApplicationsScreen({ navigation }) {
  const applications = useApplications();

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={applications}
      keyExtractor={(a) => a.driveId}
      ListEmptyComponent={<Text style={styles.empty}>No applications yet.</Text>}
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          style={styles.card}
          onPress={() => navigation.navigate('AdmitCard', { driveId: item.driveId })}
        >
          <View style={styles.row}>
            <Text style={styles.company}>{item.drive.company}</Text>
            <StatusBadge status={item.status} />
          </View>
          <Text style={styles.role}>{item.drive.role}</Text>
          <Text style={styles.meta}>📅 {formatDate(item.drive.driveDate)}</Text>
          <Text style={styles.link}>View admit card ›</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 12 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  company: { fontSize: 18, fontWeight: '700', color: colors.text },
  role: { fontSize: 15, color: colors.text },
  meta: { fontSize: 13, color: colors.muted },
  link: { fontSize: 13, fontWeight: '600', color: colors.primary },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40 },
});
