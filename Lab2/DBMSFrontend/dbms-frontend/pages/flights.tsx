import React, { useState, useEffect, Key, useContext } from "react";
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
import { LocaleContext } from "@/locales/locales";

const FlightsPage: React.FC = () => {
    useEffect(() => {
        dispatch(S.updateFlightsAsync());
    }, []);

    const locale = useContext(LocaleContext);

    const dispatch = useAppDispatch();
    const flights = useAppSelector(S.selectFlights);
    const isFlightsLoading = useAppSelector(S.selectIsFlightsLoading);
    const isAddFlightsLoading = useAppSelector(S.selectIsAddFlightLoading);
    const isAddFlightDialogOpen = useAppSelector(S.selectIsAddFlightDialogOpen);
    const addFlightErrorMessage = useAppSelector(S.selectAddFlightErrorMessage);

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const columns: ColumnsType<SingleFlight> = [
        {
            title: locale.FLIGHT_NBR,
            dataIndex: "flightNbr",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.flightNbr, b.flightNbr)
        },
        {
            title: locale.ORIG_ICAO,
            dataIndex: "origIcao",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.origIcao, b.origIcao)
        },
        {
            title: locale.DEST_ICAO,
            dataIndex: "destIcao",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.destIcao, b.destIcao)
        },
        {
            title: locale.DEP_TIME,
            dataIndex: "depTime",
            showSorterTooltip: false,
            sorter: (a, b) => a.depTime - b.depTime,
            render: x => toDateTimeStr(x)
        },
        {
            title: locale.ARR_TIME,
            dataIndex: "arrTime",
            showSorterTooltip: false,
            sorter: (a, b) => a.arrTime - b.arrTime,
            render: x => toDateTimeStr(x)
        },
        {
            title: locale.REG_NO,
            dataIndex: "regNo",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.regNo, b.regNo)
        },
        {
            title: locale.AC_TYPE,
            dataIndex: "acType",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.acType, b.acType)
        },
        {
            title: locale.PILOT_IDS,
            dataIndex: "pilotIds",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.pilotIds, b.pilotIds)
        },
        {
            title: locale.PILOTS,
            dataIndex: "pilotNames",
            showSorterTooltip: false,
            sorter: (a, b) => stringCompare(a.pilotNames, b.pilotNames)
        }
    ];

    return (
        <>
            <Head>
                <title>{locale.APP_TITLE + " - " + locale.FLIGHTS_TITLE}</title>
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
                            {locale.ADD_FLIGHT}
                        </Button>
                        <Button
                            danger
                            disabled={selectedRowKeys.length === 0}
                            onClick={() =>
                                Modal.confirm({
                                    title: locale.DELETE_FLIGHT,
                                    okText: locale.CONFIRM_DELETE_FLIGHT,
                                    cancelText: locale.CANCEL,
                                    icon: <ExclamationCircleOutlined />,
                                    content: locale.DELETE_FLIGHT_PROMPT,
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
                            {locale.DELETE_FLIGHT}
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
                    title={locale.ADD_FLIGHT}
                    onCancel={() => dispatch(S.setIsAddFlightDialogOpen(false))}
                    open={isAddFlightDialogOpen}
                    footer={null}>
                    <Form
                        name="change_pw"
                        onFinish={e => dispatch(S.addFlightAsync(e))}>
                        <Form.Item name="flightNbr" label={locale.FLIGHT_NBR}>
                            <Input
                                placeholder={locale.ENTER + locale.FLIGHT_NBR}
                            />
                        </Form.Item>

                        <Form.Item name="origIcao" label={locale.ORIG_ICAO}>
                            <Input
                                placeholder={locale.ENTER + locale.ORIG_ICAO}
                            />
                        </Form.Item>

                        <Form.Item name="destIcao" label={locale.DEST_ICAO}>
                            <Input
                                placeholder={locale.ENTER + locale.DEST_ICAO}
                            />
                        </Form.Item>

                        <Form.Item name="depTime" label={locale.DEP_TIME}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>

                        <Form.Item name="arrTime" label={locale.ARR_TIME}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>

                        <Form.Item name="acRegNo" label={locale.REG_NO}>
                            <Input placeholder={locale.ENTER + locale.REG_NO} />
                        </Form.Item>

                        <Form.Item name="pilotId" label={locale.PILOT_ID}>
                            <Input
                                placeholder={locale.ENTER + locale.PILOT_ID}
                            />
                        </Form.Item>

                        <Form.Item
                            validateStatus="error"
                            help={addFlightErrorMessage}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={isAddFlightsLoading}>
                                {locale.ADD_FLIGHT}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </>
    );
};

export default FlightsPage;
