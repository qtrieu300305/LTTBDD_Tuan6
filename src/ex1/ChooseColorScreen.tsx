import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import type { ColorKey, Phone } from "../types";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({
  navigation,
  route,
  phone,
}: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );

  const shown = picked ?? phone.defaultColor;
  const [line1, line2] = phone.name.split(" - ");

  function finishChoosing() {
    navigation.navigate("Product", { color: shown });
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.thumb}
          resizeMode="contain"
        />

        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {picked && (
            <>
              <Text style={styles.detail}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detail}>
                Cung cấp bởi{" "}
                <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        {COLOR_ORDER.map((key) => (
          <Pressable
            key={key}
            onPress={() => setPicked(key)}
            style={styles.colorRow}
          >
            <View
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />

            <Text style={styles.colorLabel}>
              {PHONE_COLORS[key].label}
            </Text>

            {picked === key && (
              <Text style={styles.check}>✓</Text>
            )}
          </Pressable>
        ))}

        <Pressable style={styles.doneBtn} onPress={finishChoosing}>
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    minHeight: 170,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  thumb: {
    width: 100,
    height: 135,
  },
  headerText: {
    flex: 1,
    paddingLeft: 12,
  },
  small: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: colors.text,
    marginTop: 7,
  },
  bold: {
    fontWeight: "bold",
  },
  price: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 17,
  },
  body: {
    flexGrow: 1,
    backgroundColor: colors.bg,
    padding: 18,
  },
  hint: {
    fontSize: 16,
    marginBottom: 12,
    color: colors.text,
  },
  colorRow: {
    minHeight: 56,
    backgroundColor: "#fff",
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: colors.blue,
  },
  colorLabel: {
    marginLeft: 14,
    fontSize: 15,
    color: colors.text,
    textTransform: "capitalize",
  },
  check: {
    marginLeft: "auto",
    fontSize: 22,
    color: colors.blue,
    fontWeight: "bold",
  },
  doneBtn: {
    backgroundColor: colors.blue,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 12,
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});