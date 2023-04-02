import type { AppProps } from "next/app";
import React, { useState } from "react";
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
    const [selectedMenuKey, setselectedMenuKey] = useState<string>("0");

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
                        defaultSelectedKeys={[selectedMenuKey]}
                        items={menuItems}
                        onClick={e => {
                            setselectedMenuKey(e.key);
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
