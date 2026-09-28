import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { drives } from '../data/mockDrives';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/formatDate';
import { colors } from '../utils/theme';

export default function AdmitCardScreen({ route }) {
  const { student } = useApp();
  const drive = drives.find((d) => d.id === route.params.driveId);
  if (!drive) return <Text style={styles.notFound}>Drive not found.</Text>;

  // QR payload: student roll number + drive ID
  const payload = JSON.stringify({ rollNo: student.rollNo, driveId: drive.id });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ADMIT CARD</Text>
        <QRCode value={payload} size={180} />
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.meta}>Roll No: {student.rollNo}</Text>
        <View style={styles.divider} />
        <Text style={styles.drive}>{drive.role}</Text>
        <Text style={styles.meta}>{drive.company}</Text>
        <Text style={styles.meta}>📅 {formatDate(drive.driveDate)}</Text>
        <Text style={styles.meta}>📍 {drive.venue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 14, fontWeight: '800', letterSpacing: 2, color: colors.primary },
  name: { fontSize: 20, fontWeight: '700', marginTop: 8, color: colors.text },
  drive: { fontSize: 17, fontWeight: '700', color: colors.text },
  meta: { fontSize: 14, color: colors.muted },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginVertical: 6,
  },
  notFound: { padding: 24, textAlign: 'center' },
});
