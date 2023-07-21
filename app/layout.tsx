import { Providers } from "@/lib/providers";

import styles from "./styles/layout.module.css";
import "./styles/globals.css";
import { roboto } from "./fonts";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="ru">
        <body className={roboto.className}>
          <section className="container mx-auto">
            <main className={styles.main}>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  );
}
