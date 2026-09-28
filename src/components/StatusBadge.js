import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

const STATUS_ICONS = { Applied: '📨', Attended: '🎟️', Shortlisted: '⭐', Selected: '🏆' };

export default function StatusBadge({ status }) {
  return (
    <View style={styles.badge} accessibilityLabel={`Status: ${status}`}>
      <Text style={styles.text}>
        {STATUS_ICONS[status]} {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: { fontSize: 13, fontWeight: '600', color: colors.primary },
});
