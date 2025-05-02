#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const isAndroidArm64 = process.platform === 'android' && process.arch === 'arm64';

if (!isAndroidArm64) {
  console.log('�� Android-ARM64 ���������� LightningCSS overrides');
  process.exit(0);
}

// ��ȡ package-lock.json���� node_modules �������λ�ã���ע�� overrides
const pkgPath = path.resolve(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

// ȷ��д��һ��
if (!pkg.overrides) pkg.overrides = {};
pkg.overrides['@tailwindcss/node'] = {
  lightningcss: 'npm:lightningcss.android-arm64.node'
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('��Ϊ Android-ARM64 ע�� LightningCSS overrides');
