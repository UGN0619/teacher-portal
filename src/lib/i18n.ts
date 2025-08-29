/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const headersList = headers();

  const locale = (await cookieStore).get("locale")?.value || "en";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
