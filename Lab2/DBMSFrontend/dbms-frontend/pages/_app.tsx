import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import "antd/dist/reset.css";
import * as L from "@/logics/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import locales, { LocaleContext } from "@/locales/locales";
import AppHeader from "@/components/app-header";

const { Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const [selectedNavMenuKey, setSelectedNavMenuKey] = useState("0");
    const [selectedLocaleMenuKey, setSelectedLocaleMenuKey] = useState("0");

    useEffect(() => {
        if (router.isReady) {
            if (router.route.startsWith("/flights")) {
                setSelectedNavMenuKey("0");
            } else if (router.route.startsWith("/atc_query")) {
                setSelectedNavMenuKey("1");
            } else if (router.route.startsWith("/airline_stats")) {
                setSelectedNavMenuKey("2");
            }
        }
    }, [router.isReady, router.route]);

    return (
        <LocaleContext.Provider
            value={locales[Number(selectedLocaleMenuKey)].locale}>
            <Provider store={store}>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                </Head>
                <Layout>
                    <AppHeader
                        selectedNavMenuKey={selectedNavMenuKey}
                        selectedLocaleMenuKey={selectedLocaleMenuKey}
                        onNavClick={e => L.routerJump(e)}
                        onLocaleClick={e => setSelectedLocaleMenuKey(e)}
                    />
                    <Content>
                        <Component {...pageProps} />
                    </Content>
                </Layout>
            </Provider>
        </LocaleContext.Provider>
    );
}
