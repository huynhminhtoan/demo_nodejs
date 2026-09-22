import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(({ mode }) => {
  // Đọc VITE_API_URL từ .env để làm target cho proxy
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || ''

  return {
    // THÊM DÒNG NÀY: Khai báo subpath cho ứng dụng
    base: '/qr/',

    plugins: [
      vue(),
      basicSsl() // Trang chạy HTTPS để camera hoạt động khi truy cập qua IP LAN
    ],
    server: {
      host: true, // Cho phép truy cập qua địa chỉ IP trong mạng LAN (0.0.0.0)
      port: 5173,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
