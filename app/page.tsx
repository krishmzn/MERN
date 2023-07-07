import Image from 'next/image'
import { Inter } from 'next/font/google'

import Password from './components/password'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Password />
    </>
  )
}
