import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import LoadingButton from '../components/LoadingButton';
import { MOCK_CREDENTIALS } from '../data/mockStudent';
import { colors } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const next = {};
    if (!rollNo.trim()) next.rollNo = 'Roll number is required';
    if (!password) next.password = 'Password is required';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const valid =
        rollNo.trim().toUpperCase() === MOCK_CREDENTIALS.rollNo &&
        password === MOCK_CREDENTIALS.password;
      if (valid) navigation.replace('Main');
      else setErrors({ form: 'Invalid roll number or password' });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>STON Placements</Text>
      <Text style={styles.subtitle}>Student login</Text>

      <TextInput
        style={styles.input}
        placeholder="College Roll Number"
        autoCapitalize="characters"
        value={rollNo}
        onChangeText={setRollNo}
        editable={!loading}
      />
      {!!errors.rollNo && <Text style={styles.error}>{errors.rollNo}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}
      {!!errors.form && <Text style={styles.error}>{errors.form}</Text>}

      <LoadingButton title="Login" onPress={handleSubmit} loading={loading} />
      <Text style={styles.hint}>Demo login: 21CS001 / student123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.bg,
    gap: 10,
  },
  title: { fontSize: 28, fontWeight: '800', color: colors.primary, textAlign: 'center' },
  subtitle: { fontSize: 16, color: colors.muted, textAlign: 'center', marginBottom: 16 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  error: { color: colors.bad, fontSize: 13 },
  hint: { textAlign: 'center', color: colors.muted, fontSize: 12, marginTop: 8 },
});
