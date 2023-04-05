import React, { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    selectFlightCounts,
    selectIsFlightCountsLoading,
    clearFlightCounts,
    getAllAirlineFlightCountAsync
} from "@/store/features/flight-counts/flight-counts";
import stylesCommon from "@/styles/common.module.scss";
import { Space, Table, Button, Spin, InputNumber } from "antd";

import type { ColumnsType } from "antd/es/table";
import { stringCompare } from "@/modules/cmp";
import Head from "next/head";
import type { SingleAirlineFlightCount } from "@/modules/types";
import { LocaleContext } from "@/locales/locales";

const AirlineStatsPage: React.FC = () => {
    useEffect(() => {
        dispatch(clearFlightCounts());
    }, []);

    const locale = useContext(LocaleContext);

    const dispatch = useAppDispatch();
    const flightCounts = useAppSelector(selectFlightCounts);

    const isAtcLoading = useAppSelector(selectIsFlightCountsLoading);

    const [minFlightCount, setMinFlightCount] = useState(2);

    const columns: ColumnsType<SingleAirlineFlightCount> = [
        {
            title: locale.AIRLINE_ICAO,
            dataIndex: "icao",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.icao, b.icao)
        },
        {
            title: locale.FLIGHT_COUNT,
            dataIndex: "flightCount",
            showSorterTooltip: false,
            sorter: (a, b) => a.flightCount - b.flightCount
        }
    ];

    return (
        <>
            <Head>
                <title>{locale.APP_TITLE + " - " + locale.FLIGHTS_TITLE}</title>
            </Head>
            <Spin spinning={isAtcLoading}>
                <div className={stylesCommon.divContentWrapper}>
                    <Space size={20} style={{ marginBottom: 20 }}>
                        <Space>
                            <label>{locale.MIN_FLIGHT_COUNT}:</label>
                            <InputNumber
                                placeholder={
                                    locale.ENTER + locale.MIN_FLIGHT_COUNT
                                }
                                min={1}
                                onChange={e => setMinFlightCount(e!)}
                                value={minFlightCount}
                                precision={0}
                            />
                        </Space>

                        <Button
                            type="primary"
                            onClick={() =>
                                dispatch(
                                    getAllAirlineFlightCountAsync(
                                        minFlightCount
                                    )
                                )
                            }>
                            {locale.QUERY}
                        </Button>
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={flightCounts.map((x, i) => ({
                            ...x,
                            key: i
                        }))}
                    />
                </div>
            </Spin>
        </>
    );
};

export default AirlineStatsPage;
