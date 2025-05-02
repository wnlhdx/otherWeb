#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const isAndroidArm64 = process.platform === 'android' && process.arch === 'arm64';

if (!isAndroidArm64) {
  console.log('非 Android-ARM64 环境，跳过 LightningCSS overrides');
  process.exit(0);
}

// 读取 package-lock.json（或 node_modules 里的理想位置），注入 overrides
const pkgPath = path.resolve(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

// 确保写入一次
if (!pkg.overrides) pkg.overrides = {};
pkg.overrides['@tailwindcss/node'] = {
  lightningcss: 'npm:lightningcss.android-arm64.node'
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('已为 Android-ARM64 注入 LightningCSS overrides');
