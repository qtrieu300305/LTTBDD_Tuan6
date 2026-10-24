
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);

    try {
      const result = await fetchPhone("1");
      setPhone(result);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorTitle}>Không tải được sản phẩm</Text>
        <Text style={styles.errorMessage}>{error}</Text>

        <TouchableOpacity style={styles.button} onPress={load}>
          <Text style={styles.buttonText}>THỬ LẠI</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!phone) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#4F63C8" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </SafeAreaView>
    );
  }

  return <SelectPhoneApp phone={phone} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#1F2430",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 10,
    marginBottom: 20,
    color: "#6B7280",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4F63C8",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
