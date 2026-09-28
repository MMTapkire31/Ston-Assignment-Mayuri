import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

// Icon + text, so meaning never depends on colour alone.
export default function EligibilityTag({ eligible }) {
  return (
    <View style={[styles.tag, eligible ? styles.ok : styles.bad]}>
      <Text style={[styles.text, { color: eligible ? colors.ok : colors.bad }]}>
        {eligible ? '✓ Eligible' : '✕ Not eligible'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ok: { backgroundColor: colors.okBg },
  bad: { backgroundColor: colors.badBg },
  text: { fontSize: 12, fontWeight: '600' },
});
