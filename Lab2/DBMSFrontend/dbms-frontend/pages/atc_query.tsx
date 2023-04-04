import React, { useState, useEffect } from "react";
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

const columns: ColumnsType<SingleAtc> = [
    {
        title: "管制员职工号",
        dataIndex: "id",
        showSorterTooltip: false,
        sorter: (a, b) => a.id - b.id
    },
    {
        title: "管制员姓名",
        dataIndex: "name",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.name, b.name)
    },
    {
        title: "所在机场ICAO",
        dataIndex: "airportIcao",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.airportIcao, b.airportIcao)
    }
];

const AtcQueryPage: React.FC = () => {
    useEffect(() => {
        dispatch(clearAtcs());
    }, []);

    const dispatch = useAppDispatch();

    const atcs = useAppSelector(selectAtcs);
    const isAtcLoading = useAppSelector(selectIsAtcsLoading);

    const [flightNumber, setFlightNumber] = useState("");

    return (
        <>
            <Head>
                <title>HIT民航信息监控系统 - 管制员查询</title>
            </Head>
            <Spin spinning={isAtcLoading}>
                <div className={stylesCommon.divContentWrapper}>
                    <Space size={20} style={{ marginBottom: 20 }}>
                        <Input
                            placeholder="请输入航班号"
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
                            查询
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
