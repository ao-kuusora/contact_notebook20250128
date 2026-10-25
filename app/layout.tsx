import type { Viewport } from "next";
import "./globals.css";
import UIWrapper from "@/components/UIWrapper";

export const metadata = {
  title: "2人の連絡帳",
};

// viewport-fit=cover で iPhone のノッチ / ホームバー領域まで描画し、
// safe-area-inset (globals.css) で固定バーを避ける
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <UIWrapper>{children}</UIWrapper>
      </body>
    </html>
  );
}
