import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { NavigationHelper } from '../../utils/NavigationHelper';

/** Color system */
const Male = {
  bg: '#F0F9FF',
  primary: '#2563EB',
  primarySoft: '#DBEAFE',
  chipBg: '#EFF6FF',
};
const Female = {
  bg: '#FDF2F8',
  primary: '#EC4899',
  primarySoft: '#FCE7F3',
  chipBg: '#FFF1F2',
};

function CNBubble() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
      <View style={styles.logoSquare}>
        <Text style={styles.logoText}>CN</Text>
      </View>
    </View>
  );
}

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const monkeyScale = useRef(new Animated.Value(1)).current;

  const theme = gender === 'male' ? Male : Female;

  useEffect(() => {
    if (password.length > 0) {
      Animated.sequence([
        Animated.spring(monkeyScale, { toValue: 1.3, friction: 3, tension: 140, useNativeDriver: true }),
        Animated.spring(monkeyScale, { toValue: 1.1, friction: 4, tension: 110, useNativeDriver: true })
      ]).start();
    } else {
      Animated.spring(monkeyScale, { toValue: 1, friction: 3, tension: 100, useNativeDriver: true }).start();
    }
  }, [password.length, monkeyScale]);

  const passwordStrength = useMemo(() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s; // 0..4
  }, [password]);

  const handleRegister = async () => {
    const firstNameTrim = firstName.trim();
    const lastNameTrim = lastName.trim();
    const emailTrim = email.trim();
    const pass = password;
    const newErrors: {[key: string]: string} = {};

    if (!firstNameTrim) newErrors.firstName = 'Ad gereklidir';
    if (!emailTrim) newErrors.email = 'E-posta gereklidir';
    if (!pass) newErrors.password = 'Şifre gereklidir';
    if (!age) newErrors.age = 'Yaş gereklidir';
    if (!location) newErrors.location = 'Şehir gereklidir';

    if (firstNameTrim && firstNameTrim.length < 2) newErrors.firstName = 'Ad en az 2 karakter';
    if (firstNameTrim && firstNameTrim.length > 15) newErrors.firstName = 'Ad en fazla 15 karakter';
    if (lastNameTrim && lastNameTrim.length > 15) newErrors.lastName = 'Soyad en fazla 15 karakter';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailTrim && !emailRegex.test(emailTrim)) newErrors.email = 'Geçerli e-posta girin';
    if (pass && pass.length < 6) newErrors.password = 'Şifre en az 6 karakter';
    if (pass && pass.length > 20) newErrors.password = 'Şifre en fazla 20 karakter';
    const ageNum = parseInt(age);
    if (age) {
      if (isNaN(ageNum)) newErrors.age = 'Yaş sayı olmalı';
      else if (ageNum < 18) newErrors.age = '18 yaş altı kayıt olmaz';
      else if (ageNum > 99) newErrors.age = '99 üstü geçersiz';
    }
    if (location && location.length > 15) newErrors.location = 'Şehir en fazla 15 karakter';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});

    setIsLoading(true);
    try {
      const registerData = {
        name: firstNameTrim,
        surname: lastNameTrim,
        email: emailTrim,
        password: pass,
        age: parseInt(age),
        location,
        gender
      };
      console.log('📝 Sending register data:', registerData);
      const ok = await register(registerData);
      if (ok) NavigationHelper.goHome();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.safe, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={[styles.scroller, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient colors={[theme.primary, '#60A5FA']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.headerGrad}>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Hesap Oluştur</Text>
              <View style={styles.headerChip}>
                <Text style={styles.headerChipTxt}>{gender === 'male' ? 'Erkek tema' : 'Kadın tema'}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.container}>
            <View style={styles.logoWrap}><CNBubble /></View>

            <View style={styles.card}>
              <View style={styles.row}>
                <Field label="Ad" value={firstName} onChangeText={(t: string)=>{ setFirstName(t); if (errors.firstName) setErrors(p=>({...p, firstName:''})) }} placeholder="Ad" error={errors.firstName} prefix="👤" background={theme.primarySoft} autoCapitalize="words" maxLength={15} containerStyle={{ flex:1, marginRight: 8 }} />
                <Field label="Soyad" value={lastName} onChangeText={(t: string)=>{ setLastName(t); if (errors.lastName) setErrors(p=>({...p, lastName:''})) }} placeholder="Soyad" error={errors.lastName} prefix="👤" background={theme.primarySoft} autoCapitalize="words" maxLength={15} containerStyle={{ flex:1, marginLeft: 8 }} />
              </View>
              <Field label="E-posta" value={email} onChangeText={(t: string)=>{ setEmail(t); if (errors.email) setErrors(p=>({...p, email:''})) }} placeholder="E-posta" keyboardType="email-address" autoCapitalize="none" error={errors.email} prefix="✉️" background={theme.primarySoft} />
              <View style={{ marginBottom: 14 }}>
                <Field label="Şifre" value={password} onChangeText={(t: string)=>{ setPassword(t); if (errors.password) setErrors(p=>({...p, password:''})) }} placeholder="Şifre" secureTextEntry={!showPassword} error={errors.password} prefix="🔒" background={theme.primarySoft} right={<TouchableOpacity style={styles.eyeBtn} onPress={()=>setShowPassword(s=>!s)}><Animated.View style={{ transform:[{scale: monkeyScale}] }}><Text style={styles.eyeTxt}>{password.length===0 ? '🐵' : (showPassword ? '🐵' : '🙈')}</Text></Animated.View></TouchableOpacity>} maxLength={20} />
                <View style={styles.strengthBar}>
                  <View style={[styles.strengthSeg, { backgroundColor: passwordStrength>=1 ? theme.primary : '#E5E7EB' }]} />
                  <View style={[styles.strengthSeg, { backgroundColor: passwordStrength>=2 ? theme.primary : '#E5E7EB' }]} />
                  <View style={[styles.strengthSeg, { backgroundColor: passwordStrength>=3 ? theme.primary : '#E5E7EB' }]} />
                  <View style={[styles.strengthSeg, { backgroundColor: passwordStrength>=4 ? theme.primary : '#E5E7EB' }]} />
                </View>
              </View>

              <View style={styles.row}>
                <Field label="Yaş" value={age} onChangeText={(t: string)=>{ const n=t.replace(/[^0-9]/g,''); setAge(n); if (errors.age) setErrors(p=>({...p, age:''})) }} placeholder="18" keyboardType="numeric" error={errors.age} background={theme.primarySoft} prefix="🎂" containerStyle={{ flex:1, marginRight: 8 }} maxLength={2} />
                <Field label="Şehir" value={location} onChangeText={(t: string)=>{ if(t.length<=15) setLocation(t) }} placeholder="İstanbul" error={errors.location} background={theme.primarySoft} prefix="🏙️" containerStyle={{ flex:1, marginLeft: 8 }} maxLength={15} />
              </View>

              <Text style={styles.label}>Cinsiyet</Text>
              <View style={styles.segmentRow}>
                <TouchableOpacity onPress={()=>setGender('male')} style={[styles.segmentBtn, gender==='male' && { backgroundColor: theme.primary, borderColor: theme.primary }]}>
                  <Text style={[styles.segmentTxt, gender==='male' && { color:'#fff', fontWeight:'700' }]}>Erkek</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setGender('female')} style={[styles.segmentBtn, gender==='female' && { backgroundColor: theme.primary, borderColor: theme.primary }]}>
                  <Text style={[styles.segmentTxt, gender==='female' && { color:'#fff', fontWeight:'700' }]}>Kadın</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.submit, { backgroundColor: isLoading ? '#9CA3AF' : theme.primary }]} onPress={handleRegister} disabled={isLoading}>
                <Text style={styles.submitTxt}>{isLoading ? 'Kaydediliyor...' : 'Kaydol'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerTxt}>Zaten hesabınız var mı?</Text>
              <TouchableOpacity onPress={() => NavigationHelper.goToLogin()}>
                <Text style={[styles.footerLink, { color: theme.primary }]}>Giriş yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, error, prefix, right, background, containerStyle, autoCapitalize, maxLength }: any) {
  return (
    <View style={[{ marginBottom: 12 }, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.fieldWrap, { backgroundColor: background || '#F3F4F6' }, error && styles.fieldError]}>
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
        />
        {right}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  kav: { flex: 1 },
  scroller: { alignItems: 'center', paddingHorizontal: 16 },
  headerGrad: { width: '100%', maxWidth: 520, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  headerChip: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  headerChipTxt: { color: '#fff', fontSize: 12, fontWeight: '700' },

  container: { width: '100%', maxWidth: 520 },
  logoWrap: { alignItems: 'center', marginTop: 16, marginBottom: 6 },

  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },

  label: { color: '#111827', fontWeight: '800', marginBottom: 6 },
  fieldWrap: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  fieldError: { borderColor: '#EF4444' },
  prefix: { fontSize: 16, color: '#6B7280', marginRight: 8 },
  input: { flex: 1, color: '#111827', fontSize: 16, paddingVertical: 0 },

  eyeBtn: { paddingHorizontal: 6, paddingVertical: 2 },
  eyeTxt: { fontSize: 18 },

  strengthBar: { flexDirection: 'row', gap: 6, marginTop: 6 },
  strengthSeg: { flex: 1, height: 4, borderRadius: 2 },

  row: { flexDirection: 'row', marginTop: 4 },

  segmentRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  segmentBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 999, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#fff' },
  segmentTxt: { color: '#111827', fontWeight: '700' },

  submit: { marginTop: 10, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  submitTxt: { color: '#fff', fontWeight: '800' },

  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 14 },
  footerTxt: { color: '#6B7280', fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: '800', marginLeft: 6 },

  logoSquare: { width: 88, height: 88, backgroundColor: '#E93E7F', borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: '#E93E7F', shadowOpacity: 0.25, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 10, transform: [{ rotate: '-10deg' }] },
  logoText: { fontSize: 38, fontWeight: '900', color: '#fff', letterSpacing: 1.2 },
  error: { color: '#EF4444', fontSize: 12, marginTop: 4 },
});
