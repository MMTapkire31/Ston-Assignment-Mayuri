import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LoadingButton from '../components/LoadingButton';
import EligibilityTag from '../components/EligibilityTag';
import { drives } from '../data/mockDrives';
import { useApp } from '../context/AppContext';
import useEligibility from '../hooks/useEligibility';
import { formatDate } from '../utils/formatDate';
import { colors } from '../utils/theme';

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function DriveDetailScreen({ route, navigation }) {
  const drive = drives.find((d) => d.id === route.params.driveId);
  const { isApplied, apply } = useApp();
  const check = useEligibility();

  // Show the company name in the header once the drive is resolved
  useEffect(() => {
    if (drive) navigation.setOptions({ title: drive.company });
  }, [navigation, drive]);

  if (!drive) return <Text style={styles.notFound}>Drive not found.</Text>;

  const { eligible, reason } = check(drive);
  const applied = isApplied(drive.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.company}>{drive.company}</Text>
      <Text style={styles.role}>{drive.role}</Text>
      <EligibilityTag eligible={eligible} />

      <View style={styles.card}>
        <InfoRow label="CTC" value={drive.ctc} />
        <InfoRow label="Drive date" value={formatDate(drive.driveDate)} />
        <InfoRow label="Venue" value={drive.venue} />
        <InfoRow label="Min CGPA" value={drive.minCGPA.toFixed(1)} />
        <InfoRow label="Branches" value={drive.eligibleBranches.join(', ')} />
      </View>

      <Text style={styles.heading}>About this drive</Text>
      <Text style={styles.desc}>{drive.description}</Text>

      {!eligible && <Text style={styles.reason}>✕ {reason}</Text>}

      <LoadingButton
        title={applied ? 'Applied' : 'Apply Now'}
        disabled={!eligible || applied}
        onPress={() => apply(drive.id)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10, backgroundColor: colors.bg, flexGrow: 1 },
  company: { fontSize: 24, fontWeight: '800', color: colors.text },
  role: { fontSize: 16, color: colors.muted },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: colors.muted },
  value: { fontWeight: '600', color: colors.text, flexShrink: 1, textAlign: 'right' },
  heading: { fontSize: 16, fontWeight: '700', marginTop: 4 },
  desc: { color: colors.text, lineHeight: 20 },
  reason: {
    color: colors.bad,
    backgroundColor: colors.badBg,
    padding: 10,
    borderRadius: 8,
    fontWeight: '600',
  },
  notFound: { padding: 24, textAlign: 'center' },
});
