
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorBox({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Không tải được dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>

      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  message: {
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E53A2F",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
