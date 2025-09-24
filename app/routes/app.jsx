import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider as RemixAppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <RemixAppProvider isEmbeddedApp apiKey={apiKey}>
      <PolarisAppProvider i18n={enTranslations}>
        <NavMenu>
          <a href="/app">🏠 Home</a>
          <a href="/app/additional">📄 Additional Page</a>
          <a href="/app/test-api">🧪 Test Page</a>
        </NavMenu>
        <Outlet />
      </PolarisAppProvider>
    </RemixAppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
