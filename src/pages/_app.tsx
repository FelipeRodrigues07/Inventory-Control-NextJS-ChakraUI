import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SidebarProvider} from "@/contexts/SidebarContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider>
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  </ChakraProvider>
  )
}
