import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const server = loadEnv(mode,process.cwd(), '');
  
  return{
    base:"/",
    plugins: [react(), tailwindcss()],
    server: { proxy: { "/api": { target: server} } },
  }
})
