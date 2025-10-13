// purchase.tsx — responsive UI for phones and tablets; palette and flow preserved
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../../contexts/ProfileContext';
import { NavigationHelper } from '../../utils/NavigationHelper';

type DiamondPackage = { id: string; amount: number; priceText: string };
type PaymentMethod = { id: string; name: string; icon: keyof typeof Ionicons.glyphMap };

const PACKAGES: DiamondPackage[] = [
  { id: '1', amount: 100, priceText: '10 TL' },
  { id: '2', amount: 500, priceText: '45 TL' },
  { id: '3', amount: 1000, priceText: '80 TL' },
  { id: '4', amount: 2500, priceText: '180 TL' },
];

const METHODS: PaymentMethod[] = [
  { id: '1', name: 'Kredi Kartı', icon: 'card' },
  { id: '2', name: 'Mobil Ödeme', icon: 'phone-portrait' },
];

export default function Purchase() {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;
  const cols = isTablet ? 2 : 1;
  const gap = 12;
  const pad = 20;
  const cardWidth = useMemo(() => (width - pad * 2 - gap * (cols - 1)) / cols, [width, cols]);

  const scale = (n: number) => {
    const f = Math.max(0.92, Math.min(1.12, width / 375));
    return Math.round(n * f);
  };

  const { currentUser, addDiamonds } = useProfile();
  const primary = currentUser?.gender === 'male' ? '#3B82F6' : '#FF6B95';
  const gradient = useMemo<[string, string]>(() => (currentUser?.gender === 'male' ? ['#1e3a8a', '#3b82f6'] : ['#ff5571', '#ff6b95']), [currentUser?.gender]);

  const [selectedPkg, setSelectedPkg] = useState<string>('2');
  const [selectedMethod, setSelectedMethod] = useState<string>('1');

  const onBuy = () => {
    const p = PACKAGES.find(x => x.id === selectedPkg);
    if (!p) return;
    addDiamonds(p.amount);
    NavigationHelper.goToProfile();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => NavigationHelper.goToProfile()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.hTitle, { fontSize: scale(20) }]}>Jeton Satın Al</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      {/* Content */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: pad, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { fontSize: scale(18) }]}>Jeton Paketleri</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {PACKAGES.map((p, i) => {
            const selected = selectedPkg === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                activeOpacity={0.9}
                onPress={() => setSelectedPkg(p.id)}
                style={[
                  styles.card,
                  { width: cardWidth, marginRight: (i % cols) < (cols - 1) ? gap : 0 },
                  selected && { borderColor: primary, borderWidth: 2, shadowColor: primary, shadowOpacity: 0.2 },
                ]}
              >
                <View style={[styles.cardIcon, { backgroundColor: currentUser?.gender === 'male' ? '#eef2ff' : '#fdf2f8' }]}>
                  <Ionicons name="diamond" size={22} color={primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, { fontSize: scale(16) }]}>{p.amount} Jeton</Text>
                  <Text style={[styles.cardSub, { fontSize: scale(14) }]}>{p.priceText}</Text>
                </View>
                <View style={styles.radio}>
                  <View style={[styles.dot, selected && { backgroundColor: primary, borderColor: primary }]}>
                    {selected && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { fontSize: scale(18), marginTop: 16 }]}>Ödeme Yöntemi</Text>
        {METHODS.map(m => {
          const selected = selectedMethod === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.9}
              onPress={() => setSelectedMethod(m.id)}
              style={[styles.payCard, selected && { borderColor: primary, borderWidth: 2, shadowColor: primary, shadowOpacity: 0.2 }]}
            >
              <View style={[styles.cardIcon, { backgroundColor: currentUser?.gender === 'male' ? '#eef2ff' : '#fdf2f8' }]}>
                <Ionicons name={m.icon} size={22} color={primary} />
              </View>
              <Text style={[styles.payName, { fontSize: scale(16) }]}>{m.name}</Text>
              <View style={styles.radio}>
                <View style={[styles.dot, selected && { backgroundColor: primary, borderColor: primary }]}>
                  {selected && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Buy button */}
      <View style={styles.buyBar}>
        <TouchableOpacity onPress={onBuy} style={styles.buyBtn} activeOpacity={0.92}>
          <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buyGrad}>
            <Ionicons name="diamond" size={18} color="#fff" />
            <Text style={styles.buyText}>Satın Al</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  hTitle: { color: '#fff', fontWeight: '700' },
  sectionTitle: { color: '#1F2937', fontWeight: '700', marginVertical: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: { color: '#1F2937', fontWeight: '700' },
  cardSub: { color: '#6B7280', fontWeight: '600' },
  radio: { alignItems: 'center', justifyContent: 'center' },
  dot: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center',
  },
  payCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  payName: { flex: 1, color: '#1F2937', fontWeight: '600' },
  buyBar: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  buyBtn: { borderRadius: 14, overflow: 'hidden' },
  buyGrad: { height: 48, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  buyText: { color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 6 },
});