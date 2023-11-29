import React from "react";
import { createRoot } from "react-dom/client";
import { i18nClient, useTranslation } from "@sailor/i18n-web";

i18nClient 
    .init({
        resources: {
            en: {
                translation: {
                    "Welcome to I18N React": "Welcome to I18N React, enjoy it",
                },
            },
        },
        fallbackLng: "en",
        react: {
            useSuspense: false
        }
    });

function App() {
    const { t } = useTranslation();

    return <h2>{t("Welcome to I18N React")}</h2>;
}

const root = createRoot(document.getElementById("app") as Element);
root.render(<App />);
