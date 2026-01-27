import "./globals.css";
import UIWrapper from "@/components/UIWrapper";

export const metadata = {
  title: "2人の連絡帳",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-white">
        <UIWrapper>
          {children}
        </UIWrapper>
      </body>
    </html>
  );
}