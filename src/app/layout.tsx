import { Inter as FontSans } from 'next/font/google'

import { ReduxProvider } from '~/app/redux/provider'

import '../styles/globals.css'

import { cn } from '~/lib/utils'

interface RootLayoutProps {
  children: React.ReactNode
}

const fontSans = FontSans({
  subsets: ['latin-ext'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'Главная страница',
  description: 'Здравствуйте!'
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'm-auto max-h-screen max-w-4xl bg-background bg-gray-300 px-4 font-sans antialiased',
          fontSans.variable
        )}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
