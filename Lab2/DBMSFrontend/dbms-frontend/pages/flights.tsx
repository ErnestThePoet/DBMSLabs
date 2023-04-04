import React, { useState, useEffect, Key } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import * as S from "@/store/features/flights/flights";
import stylesCommon from "@/styles/common.module.scss";
import {
    Space,
    Table,
    Button,
    Spin,
    Modal,
    Form,
    Input,
    DatePicker
} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import { stringCompare } from "@/modules/cmp";
import { toDateTimeStr } from "@/modules/date-time";
import Head from "next/head";
import type { SingleFlight } from "@/modules/types";

const columns: ColumnsType<SingleFlight> = [
    {
        title: "航班号",
        dataIndex: "flightNbr",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.flightNbr, b.flightNbr)
    },
    {
        title: "起飞机场ICAO",
        dataIndex: "origIcao",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.origIcao, b.origIcao)
    },
    {
        title: "目的机场ICAO",
        dataIndex: "destIcao",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.destIcao, b.destIcao)
    },
    {
        title: "起飞时间",
        dataIndex: "depTime",
        showSorterTooltip: false,
        sorter: (a, b) => a.depTime - b.depTime,
        render: x => toDateTimeStr(x)
    },
    {
        title: "着陆时间",
        dataIndex: "arrTime",
        showSorterTooltip: false,
        sorter: (a, b) => a.arrTime - b.arrTime,
        render: x => toDateTimeStr(x)
    },
    {
        title: "飞机注册号",
        dataIndex: "regNo",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.regNo, b.regNo)
    },
    {
        title: "机型",
        dataIndex: "acType",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.acType, b.acType)
    },
    {
        title: "飞行机组职工号",
        dataIndex: "pilotIds",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.pilotIds, b.pilotIds)
    },
    {
        title: "飞行机组",
        dataIndex: "pilotNames",
        showSorterTooltip: false,
        sorter: (a, b) => stringCompare(a.pilotNames, b.pilotNames)
    }
];

const FlightsPage: React.FC = () => {
    useEffect(() => {
        dispatch(S.updateFlightsAsync());
    }, []);

    const dispatch = useAppDispatch();
    const flights = useAppSelector(S.selectFlights);
    const isFlightsLoading = useAppSelector(S.selectIsFlightsLoading);
    const isAddFlightsLoading = useAppSelector(S.selectIsAddFlightLoading);
    const isAddFlightDialogOpen = useAppSelector(S.selectIsAddFlightDialogOpen);
    const addFlightErrorMessage = useAppSelector(S.selectAddFlightErrorMessage);

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    return (
        <>
            <Head>
                <title>HIT民航信息监控系统 - 航班查询</title>
            </Head>
            <Spin spinning={isFlightsLoading}>
                <div className={stylesCommon.divContentWrapper}>
                    <Space size={20} style={{ marginBottom: 20 }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() =>
                                dispatch(S.setIsAddFlightDialogOpen(true))
                            }>
                            添加航班
                        </Button>
                        <Button
                            danger
                            disabled={selectedRowKeys.length === 0}
                            onClick={() =>
                                Modal.confirm({
                                    title: "删除航班",
                                    okText: "确认删除",
                                    cancelText: "返回",
                                    icon: <ExclamationCircleOutlined />,
                                    content: "确认删除所选航班吗？",
                                    onOk: () =>
                                        dispatch(
                                            S.deleteFlightAsync({
                                                flightNbr:
                                                    flights[
                                                        selectedRowKeys[0] as number
                                                    ].flightNbr,
                                                origIcao:
                                                    flights[
                                                        selectedRowKeys[0] as number
                                                    ].origIcao,
                                                destIcao:
                                                    flights[
                                                        selectedRowKeys[0] as number
                                                    ].destIcao,
                                                depTime:
                                                    flights[
                                                        selectedRowKeys[0] as number
                                                    ].depTime
                                            })
                                        )
                                })
                            }>
                            删除所选航班
                        </Button>
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={flights.map((x, i) => ({
                            ...x,
                            key: i
                        }))}
                        rowSelection={{
                            type: "radio",
                            onChange: (newSelectedRowKeys: Key[]) => {
                                setSelectedRowKeys(newSelectedRowKeys);
                            }
                        }}
                    />
                </div>

                <Modal
                    title="添加航班"
                    onCancel={() => dispatch(S.setIsAddFlightDialogOpen(false))}
                    open={isAddFlightDialogOpen}
                    footer={null}>
                    <Form
                        name="change_pw"
                        onFinish={e => dispatch(S.addFlightAsync(e))}>
                        <Form.Item name="flightNbr" label="航班号">
                            <Input placeholder="请输入航班号" />
                        </Form.Item>

                        <Form.Item name="origIcao" label="起飞机场ICAO">
                            <Input placeholder="请输入起飞机场ICAO" />
                        </Form.Item>

                        <Form.Item name="destIcao" label="目的机场ICAO">
                            <Input placeholder="请输入目的机场ICAO" />
                        </Form.Item>

                        <Form.Item name="depTime" label="起飞时间">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>

                        <Form.Item name="arrTime" label="着陆时间">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>

                        <Form.Item name="acRegNo" label="飞机注册号">
                            <Input placeholder="请输入飞机注册号" />
                        </Form.Item>

                        <Form.Item name="pilotId" label="飞行员职工号">
                            <Input placeholder="请输入飞行员职工号" />
                        </Form.Item>

                        <Form.Item
                            validateStatus="error"
                            help={addFlightErrorMessage}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={isAddFlightsLoading}>
                                添加航班
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </>
    );
};

export default FlightsPage;
