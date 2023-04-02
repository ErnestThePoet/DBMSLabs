import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import stylesCommon from "@/styles/common.module.scss";
import { Space, Table, Button, Spin, InputNumber } from "antd";

import type { ColumnsType } from "antd/es/table";
import { stringCompare } from "@/modules/cmp";
import airlineStats from "@/states/airline_stats";
import type { SingleAirlineFlightCount } from "@/states/airline_stats";
import * as L from "@/logics/airline_stats";
import Head from "next/head";

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

const AirlineStatsPage: React.FC = observer(() => {
    const [isAtcLoading, setIsAtcLoading] = useState(false);

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
                                L.getAllAirlineFlightCount(
                                    minFlightCount,
                                    setIsAtcLoading
                                )
                            }>
                            查询
                        </Button>
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={airlineStats.flightCounts.map((x, i) => ({
                            ...x,
                            key: i
                        }))}
                    />
                </div>
            </Spin>
        </>
    );
});

export default AirlineStatsPage;
