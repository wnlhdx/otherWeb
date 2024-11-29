/** @type {import('next').NextConfig} */

const nextConfig = {}

module.exports = {
  webpack(config, { isServer }) {
    // 在服务器端使用 Babel，客户端使用默认配置
    if (!isServer) {
      config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        use: ['babel-loader'],
      });
    }
    return config;
  },
};