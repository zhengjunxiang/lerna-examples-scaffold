import React from "react";
import BaseComponent from "./components/BaseComponent";
import { i18nClient } from "@sailor/i18n-web";
import resources from "./assets/locales/resources";
import { createRoot } from 'react-dom/client';

i18nClient.init({
    ns: ['waimai_home', 'waimai_home_f'],
    resources
});

const root = createRoot(document.getElementById('app') as Element);
root.render(<BaseComponent />);