/** @type {import('tailwindcss').Config} */


module.exports={
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'mathcha': '#E8FFD9',
          'mathcha-green': '#59B379',
          'mathcha-orange': '#FFC067'
        },
        width: {
          '128': '32rem',
          '156': '40rem'
        },
        backgroundImage: {
          'login-wallpaper': "url('/assets/wallpaper-login.png')",
          'admin-wallpaper': "url('/assets/admin-wallpaper.png')"
        }
      },
    },
    plugins: [],
  }
