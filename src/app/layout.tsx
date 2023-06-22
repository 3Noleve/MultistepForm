import { Inter as FontSans } from 'next/font/google'
import { ReduxProvider } from '~/app/redux/provider'
import '../styles/globals.css'
import { cn } from '~/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'Главная страница',
  description: 'Введите свои данные'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'max-w-4xl m-auto px-4 min-h-screen bg-background font-sans antialiased bg-gray-300',
          fontSans.variable
        )}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
