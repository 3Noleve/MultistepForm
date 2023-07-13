import AuthPage from '~/app/auth/auth'
import { Profile } from '~/components'

const HomePage = () => {
  return (
    <>
      <Profile fullName={'Спиркин Прохор'} />

      <AuthPage />
    </>
  )
}

export { HomePage }
