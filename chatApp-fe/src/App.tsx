import { Landing } from './components/ui/Landing'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'
import { Toaster } from './components/ui/sonner'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Chat } from './components/ui/Chat'
import { RecoilRoot } from 'recoil'

function App() {
  return <RecoilRoot>
    <BrowserRouter>
 <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <ModeToggle />
 <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/chat' element={<Chat />} />
 </Routes>
    </ThemeProvider>
  </BrowserRouter>
  </RecoilRoot>
}

export default App
