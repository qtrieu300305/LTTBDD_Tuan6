
import { PHONES } from "../data/phones";
import type { ColorKey, Phone } from "../types";

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? ""
).replace(/\/$/, "");

export const USING_API = API_URL !== "";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const VALID_COLORS: ColorKey[] = [
  "silver",
  "red",
  "black",
  "blue",
];

function normalizePhone(data: any): Phone {
  const colors = Array.isArray(data.colors)
    ? data.colors.filter((color: string) =>
        VALID_COLORS.includes(color as ColorKey)
      )
    : [];

  const defaultColor = VALID_COLORS.includes(
    data.defaultColor as ColorKey
  )
    ? (data.defaultColor as ColorKey)
    : "blue";

  const rating = Number(data.rating) || 0;

  return {
    id: String(data.id),
    name: String(data.name ?? "Điện thoại"),
    price: Number(data.price) || 0,
    oldPrice: Number(data.oldPrice) || 0,
    rating: Math.max(0, Math.min(5, Math.round(rating))),
    reviewCount: Number(data.reviewCount) || 0,
    supplier: String(data.supplier ?? ""),
    badge: String(data.badge ?? ""),
    colors: colors.length > 0 ? colors : VALID_COLORS,
    defaultColor,
  };
}

export async function fetchPhone(
  id: string
): Promise<Phone> {
  if (!USING_API) {
    await sleep(600);

    const phone = PHONES.find((item) => item.id === id);

    if (!phone) {
      throw new Error("Không tìm thấy sản phẩm.");
    }

    return phone;
  }

  try {
    const response = await fetch(
      `${API_URL}/phones/${encodeURIComponent(id)}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Không tìm thấy điện thoại ID ${id}.`);
      }

      throw new Error(`Máy chủ trả về lỗi ${response.status}.`);
    }

    const data = await response.json();
    return normalizePhone(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Không thể kết nối đến API.");
  }
}

export async function fetchPhones(): Promise<Phone[]> {
  if (!USING_API) {
    await sleep(600);
    return PHONES;
  }

  const response = await fetch(`${API_URL}/phones`);

  if (!response.ok) {
    throw new Error(`Lỗi tải danh sách: ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Dữ liệu API không đúng định dạng.");
  }

  return data.map(normalizePhone);
}
