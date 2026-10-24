import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import type { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>
            (Xem {phone.reviewCount} đánh giá)
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.badgeRow}>
          <Text style={styles.badge}>{phone.badge}</Text>
        </View>

        <Pressable
          style={styles.chooseBtn}
          onPress={() =>
            navigation.navigate("ChooseColor", { color: shown })
          }
        >
          <Text style={styles.chooseText}>
            4 MÀU - {picked ? "CHỌN LOẠI" : "CHỌN MÀU"}
          </Text>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.buyBtn}
        onPress={() => {}}
      >
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  imageWrap: {
    flex: 1,
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  info: {
    paddingBottom: 12,
  },
  name: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  review: {
    color: colors.muted,
    fontSize: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  oldPrice: {
    fontSize: 14,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badgeRow: {
    marginBottom: 14,
  },
  badge: {
    color: colors.red,
    fontSize: 12,
    fontWeight: "bold",
  },
  chooseBtn: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    padding: 14,
    justifyContent: "center",
  },
  chooseText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "bold",
  },
  arrow: {
    position: "absolute",
    right: 12,
    fontSize: 24,
    color: colors.muted,
  },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});