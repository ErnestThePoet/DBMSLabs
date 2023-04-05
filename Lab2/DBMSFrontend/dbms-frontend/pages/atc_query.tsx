import React, { useState, useEffect, useContext } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
    selectAtcs,
    selectIsAtcsLoading,
    getAirControllerByFlightNbrAsync,
    clearAtcs
} from "@/store/features/atcs/atcs";
import stylesCommon from "@/styles/common.module.scss";
import { Space, Table, Button, Spin, Input } from "antd";

import type { ColumnsType } from "antd/es/table";
import { stringCompare } from "@/modules/cmp";
import Head from "next/head";
import type { SingleAtc } from "@/modules/types";
import { LocaleContext } from "@/locales/locales";

const AtcQueryPage: React.FC = () => {
    useEffect(() => {
        dispatch(clearAtcs());
    }, []);

    const locale = useContext(LocaleContext);

    const dispatch = useAppDispatch();

    const atcs = useAppSelector(selectAtcs);
    const isAtcLoading = useAppSelector(selectIsAtcsLoading);

    const [flightNumber, setFlightNumber] = useState("");

    const columns: ColumnsType<SingleAtc> = [
        {
            title: locale.ATC_ID,
            dataIndex: "id",
            showSorterTooltip: false,
            sorter: (a, b) => a.id - b.id
        },
        {
            title: locale.ATC_NAME,
            dataIndex: "name",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.name, b.name)
        },
        {
            title: locale.ATC_AIRPORT_ICAO,
            dataIndex: "airportIcao",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.airportIcao, b.airportIcao)
        }
    ];

    return (
        <>
            <Head>
                <title>{locale.APP_TITLE + " - " + locale.ATCS_TITLE}</title>
            </Head>
            <Spin spinning={isAtcLoading}>
                <div className={stylesCommon.divContentWrapper}>
                    <Space size={20} style={{ marginBottom: 20 }}>
                        <Input
                            placeholder={locale.ENTER + locale.FLIGHT_NBR}
                            onChange={e =>
                                setFlightNumber(e.currentTarget.value)
                            }
                            value={flightNumber}
                        />

                        <Button
                            type="primary"
                            disabled={flightNumber.length === 0}
                            onClick={() =>
                                dispatch(
                                    getAirControllerByFlightNbrAsync(
                                        flightNumber
                                    )
                                )
                            }>
                            {locale.QUERY}
                        </Button>
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={atcs.map((x, i) => ({
                            ...x,
                            key: i
                        }))}
                    />
                </div>
            </Spin>
        </>
    );
};

export default AtcQueryPage;
