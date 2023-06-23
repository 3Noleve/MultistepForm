import { Profile } from '~/components'
import AuthPage from '~/app/auth/auth'

const HomePage = () => {
  return (
    <>
      <Profile fullName={'Спиркин Прохор'} />

      <AuthPage />
    </>
  )
}

export default HomePage
