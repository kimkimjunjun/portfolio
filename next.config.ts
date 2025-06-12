import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      cardinal: false,
      dns: false,
      child_process: false,
    };
    return config;
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  theme: {
    extend: {
      fontFamily: {
        // 'sans' 폰트 스택의 가장 앞에 '맑은 고딕'을 추가합니다.
        // 이렇게 하면 font-sans 클래스를 사용할 때 '맑은 고딕'이 우선 적용됩니다.
        sans: ['맑은 고딕', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default nextConfig;
