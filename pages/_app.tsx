import type { AppProps } from 'next/app'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const theme = extendBaseTheme()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraBaseProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraBaseProvider>
        </QueryClientProvider>
    )
}
