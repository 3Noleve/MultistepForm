import './globals.css';
import { Inter } from 'next/font/google';
import { ReduxProviders } from '~/app/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Главная страница',
  description: 'Введите свои данные',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>{children}</ReduxProviders>
      </body>
    </html>
  );
}
