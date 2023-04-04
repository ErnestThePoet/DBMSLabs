import React, { useState, useEffect } from "react";
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

const columns: ColumnsType<SingleAirlineFlightCount> = [
    {
        title: "航空公司ICAO",
        dataIndex: "icao",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.icao, b.icao)
    },
    {
        title: "航班数量",
        dataIndex: "flightCount",
        showSorterTooltip: false,
        sorter: (a, b) => a.flightCount - b.flightCount
    }
];

const AirlineStatsPage: React.FC = () => {
    useEffect(() => {
        dispatch(clearFlightCounts());
    }, []);

    const dispatch = useAppDispatch();
    const flightCounts = useAppSelector(selectFlightCounts);

    const isAtcLoading = useAppSelector(selectIsFlightCountsLoading);

    const [minFlightCount, setMinFlightCount] = useState(2);

    return (
        <>
            <Head>
                <title>HIT民航信息监控系统 - 航司统计</title>
            </Head>
            <Spin spinning={isAtcLoading}>
                <div className={stylesCommon.divContentWrapper}>
                    <Space size={20} style={{ marginBottom: 20 }}>
                        <Space>
                            <label>最小航班数量：</label>
                            <InputNumber
                                placeholder="请输入最小航班数量"
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
                            查询
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
