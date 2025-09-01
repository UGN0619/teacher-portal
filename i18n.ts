// i18n.ts (in project root)
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "mn"];

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale: locale ?? "en",
    messages: (await import(`./messages/${locale ?? "en"}.json`)).default,
  };
});
