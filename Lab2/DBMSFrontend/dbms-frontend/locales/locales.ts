import { createContext } from "react";
import localeEn from "./en";
import localeZhCn from "./zh-cn";

export type AppLocale = typeof localeZhCn;

export const LocaleContext = createContext(localeZhCn);

const locales: { name: string; locale: AppLocale }[] = [
    {
        name: "简体中文",
        locale: localeZhCn
    },
    {
        name: "English",
        locale: localeEn
    }
];

export default locales;
