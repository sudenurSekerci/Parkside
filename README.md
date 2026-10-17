# Parkside

React Native (Expo) ile geliştirilen mobil park uygulaması.

## Faz 1 — Kimlik doğrulama ve araç tanımı

- **Karşılama:** Giriş yap / Kayıt ol
- **Giriş:** Telefon numarası + şifre
- **Kayıt:** Ad-soyad, telefon, şifre, kart numarası, CVV
- **Araç kurulumu (yalnızca yeni kayıt sonrası):** Plaka + araç tipi (Hatchback, Sedan, SUV, Ticari)
- **Ana ekran:** Faz 2+ için yer tutucu

> **Not:** Şu an veriler cihazda (AsyncStorage) tutuluyor; gerçek API ve güvenli ödeme entegrasyonu sonraki fazlarda eklenecek. CVV ve tam kart numarası saklanmaz.

## Gereksinimler

- [Node.js](https://nodejs.org/) 20 LTS (npm ile birlikte)
- [Expo Go](https://expo.dev/go) (telefonda test için) veya Android/iOS emülatör

## Kurulum

```bash
cd Parkside
npm install
npx expo start
```

QR kodu Expo Go ile okutun veya terminalde `a` (Android) / `i` (iOS) tuşlarına basın.

İlk çalıştırmada `assets` klasöründe ikon dosyaları eksikse:

```bash
npx expo install expo-asset
```

Ardından proje kökünde `assets/icon.png`, `assets/splash-icon.png` ve `assets/adaptive-icon.png` dosyalarını ekleyin (1024×1024 PNG yeterli) veya:

```bash
npx create-expo-app@latest _temp --template blank-typescript
```

komutuyla oluşturulan `_temp/assets` içeriğini kopyalayın.

## Proje yapısı

```
App.tsx                 # Giriş noktası
src/
  context/AuthContext.tsx
  navigation/
  screens/
  storage/userStorage.ts
  components/
```

## Sonraki fazlar

Ana uygulama özellikleri (park alanı, ödeme, geçmiş vb.) `HomeScreen` üzerinden genişletilecek.
