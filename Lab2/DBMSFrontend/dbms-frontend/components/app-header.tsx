import React, { useContext } from "react";
import { Layout, Menu, Dropdown } from "antd";
import type { ItemType } from "antd/es/menu/hooks/useItems";
import styles from "@/styles/common.module.scss";
import type { MenuProps } from "antd";
import locales, { LocaleContext } from "@/locales/locales";

const { Header } = Layout;

const localeMenuItems: MenuProps["items"] = locales.map((x, i) => ({
    key: String(i),
    label: x.name
}));

interface AppHeaderProps {
    selectedNavMenuKey: string;
    selectedLocaleMenuKey: string;
    onNavClick: (key: string) => void;
    onLocaleClick: (key: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
    const locale = useContext(LocaleContext);

    const navMenuItems: ItemType[] = [
        locale.FLIGHTS_TITLE,
        locale.ATCS_TITLE,
        locale.FLIGHT_COUNTS_TITLE
    ].map((x, i) => ({
        key: String(i),
        label: x
    }));

    return (
        <Header className={styles.header}>
            <Menu
                // In flex parent, flex:auto is needed to prevent it from collasping
                // when switching locales.
                style={{flex:"auto"}}
                theme="dark"
                mode="horizontal"
                selectedKeys={[props.selectedNavMenuKey]}
                items={navMenuItems}
                onClick={e => props.onNavClick(e.key)}
            />

            <Dropdown
                className={styles.dropdownLocale}
                menu={{
                    items: localeMenuItems,
                    selectable: true,
                    selectedKeys: [props.selectedLocaleMenuKey],
                    onClick: e => props.onLocaleClick(e.key)
                }}>
                <img src="lang.svg" alt="lang" />
            </Dropdown>
        </Header>
    );
};

export default AppHeader;
