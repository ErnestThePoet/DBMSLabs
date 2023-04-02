import { observer } from "mobx-react-lite";
import React, { useState, Key } from "react";
import styles from "@/styles/flights.module.scss";
import { Space, Table, Button, Spin, Input } from "antd";

import type { ColumnsType } from "antd/es/table";
import { stringCompare } from "@/modules/cmp";
import atcs from "@/states/atcs";
import type { SingleAtc } from "@/states/atcs";
import * as L from "@/logics/atc_query";

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

const AtcQueryPage: React.FC = observer(() => {
    const [isAtcLoading, setIsAtcLoading] = useState(false);

    const [flightNumber, setFlightNumber] = useState("");

    return (
        <Spin spinning={isAtcLoading}>
            <div className={styles.divFlightsWrapper}>
                <Space
                    direction="horizontal"
                    size={20}
                    style={{ marginBottom: 20 }}>
                    <Input
                        placeholder="请输入航班号"
                        onChange={e => setFlightNumber(e.currentTarget.value)}
                        value={flightNumber}
                    />

                    <Button
                        type="primary"
                        disabled={flightNumber.length === 0}
                        onClick={() =>
                            L.getAirControllerByFlightNbr(
                                flightNumber,
                                setIsAtcLoading
                            )
                        }>
                        查询
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={atcs.atcs.map((x, i) => ({
                        ...x,
                        key: i
                    }))}
                />
            </div>
        </Spin>
    );
});

export default AtcQueryPage;
