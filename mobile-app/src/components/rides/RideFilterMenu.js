import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, Dimensions, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../../constants/theme';
import { RIDE_FILTER_OPTIONS } from '../../constants/rideFilters';

// Round filter button that opens a dropdown of filter options
export default function RideFilterMenu({ value, onChange }) {
  const btnRef = useRef(null);
  const [anchor, setAnchor] = useState(null);

  const open = () => btnRef.current?.measureInWindow((x, y, w, h) => setAnchor({ x, y, w, h }));
  const close = () => setAnchor(null);
  const select = (opt) => {
    onChange(opt);
    close();
  };

  return (
    <>
      <TouchableOpacity ref={btnRef} style={styles.btn} onPress={open} accessibilityLabel="Filter ride logs">
        <MaterialIcons name="filter-list" size={20} color={colors.primary} />
      </TouchableOpacity>

      <Modal visible={!!anchor} transparent animationType="fade" onRequestClose={close} statusBarTranslucent>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
        {anchor && (
          <View
            style={[
              styles.menu,
              { top: anchor.y + anchor.h + 4, right: Dimensions.get('window').width - (anchor.x + anchor.w) },
            ]}
          >
            {RIDE_FILTER_OPTIONS.map((opt) => {
              const active = opt === value;
              return (
                <TouchableOpacity key={opt} style={styles.item} onPress={() => select(opt)}>
                  <Text style={[styles.itemText, active && { color: colors.primary, fontFamily: fonts.bodyMedium }]}>
                    {opt}
                  </Text>
                  {active && <MaterialIcons name="check" size={16} color={colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surfaceLow, alignItems: 'center', justifyContent: 'center',
  },
  menu: {
    position: 'absolute', width: 176, paddingVertical: 4,
    backgroundColor: colors.surfaceLowest, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.surfaceContainerHigh,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
  },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  itemText: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurface },
});