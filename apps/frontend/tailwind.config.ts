import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config/tailwindConfig';

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./app/**/*.tsx'],
  presets: [sharedConfig],
};

export default config;
