import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/theme';

export default function LoadingButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}) {
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive }}
      style={[styles.btn, inactive && styles.btnOff]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnOff: { backgroundColor: '#9CA3AF' },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
