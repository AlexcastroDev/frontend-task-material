import { makeServer } from "../api"
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProvider } from './contexts/AppProvider';
import { FunctionComponent } from "react";
import { Home } from "./views/Home";
import "./styles/main.css"

const queryClient = new QueryClient()

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

export const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
            <Home></Home>
        </AppProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}