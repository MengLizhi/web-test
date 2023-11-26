import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN/main.json';
import enUS from './en-US/main.json';

const messages = {
  'en-US': {
    ...enUS,
  },
  'zh-CN': {
    ...zhCN,
  },
};
export type Language = keyof typeof messages;
export const i18n = createI18n({
  // locale: "zh-CN", // set locale
  locale: 'zh-CN',
  fallbackLocale: 'en-US', // set fallback locale
  legacy: false,
  messages,
});
