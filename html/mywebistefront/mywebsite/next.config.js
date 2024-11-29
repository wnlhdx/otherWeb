/** @type {import('next').NextConfig} */

const nextConfig = {}

module.exports = {
  swcMinify: false,  // 禁用 swc 因为Android上的Swc目前还有问题
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