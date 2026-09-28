import { Pressable, StyleSheet, Text, View } from 'react-native';
import EligibilityTag from './EligibilityTag';
import { colors } from '../utils/theme';
import { formatDate } from '../utils/formatDate';

export default function DriveCard({ drive, eligible, applied, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.company}>{drive.company}</Text>
        <Text style={styles.ctc}>{drive.ctc}</Text>
      </View>
      <Text style={styles.role}>{drive.role}</Text>
      <Text style={styles.meta}>📅 {formatDate(drive.driveDate)}</Text>
      <View style={styles.row}>
        <EligibilityTag eligible={eligible} />
        {applied && <Text style={styles.applied}>✔ Applied</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  ctc: { fontSize: 15, fontWeight: '600', color: colors.primary },
  role: { fontSize: 15, color: colors.text },
  meta: { fontSize: 13, color: colors.muted },
  applied: { fontSize: 13, fontWeight: '700', color: colors.primary },
});
