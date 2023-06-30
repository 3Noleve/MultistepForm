import { Inter as FontSans } from 'next/font/google'
import { ReduxProvider } from '~/app/redux/provider'
import '../styles/globals.css'
import { cn } from '~/lib/utils'

const fontSans = FontSans({
  subsets: ['latin-ext'],
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
          'm-auto min-h-screen max-w-4xl bg-background bg-gray-300 px-4 font-sans antialiased',
          fontSans.variable
        )}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
