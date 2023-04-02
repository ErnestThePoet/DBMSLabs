import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/reset.css";
import { ItemType } from "antd/es/menu/hooks/useItems";
import * as L from "../logics/app";
import Head from "next/head";

const { Header, Content } = Layout;

const menuItems: ItemType[] = ["航班查询", "管制员查询", "航司统计"].map(
    (x, i) => ({
        key: String(i),
        label: x
    })
);

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const [selectedMenuKey, setSelectedMenuKey] = useState("0");

    useEffect(() => {
        if (router.isReady) {
            if (router.route.startsWith("/flights")) {
                setSelectedMenuKey("0");
            } else if (router.route.startsWith("/atc_query")) {
                setSelectedMenuKey("1");
            } else if (router.route.startsWith("/airline_stats")) {
                setSelectedMenuKey("2");
            }
        }
    }, [router.isReady, router.route]);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Layout>
                <Header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%"
                    }}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[selectedMenuKey]}
                        items={menuItems}
                        onClick={e => {
                            L.routerJump(e.key);
                        }}
                    />
                </Header>
                <Content>
                    <Component {...pageProps} />
                </Content>
            </Layout>
        </>
    );
}
