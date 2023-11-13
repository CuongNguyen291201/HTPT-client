import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { create, showModal, update } from "../../redux/reducers/lophocphan.slice";

const ModalLopHocPhan = () => {
    const [form] = Form.useForm();
    const [key, setKey] = useState(Math.random());

    const open = useSelector((state) => state.lopHocPhanReducer.showModal)
    const { isUpdate, currentEntity } = useSelector((state) => state.lopHocPhanReducer)
    const { chinhanh } = useSelector((state) => state.chiNhanhReducer)
    const { monhoc } = useSelector((state) => state.monHocReducer)

    const dispatch = useDispatch()

    const optionCN = chinhanh.reduce((prev, item) => [...prev, { value: item.id, label: item.ten }], []);
    const optionMH = monhoc.reduce((prev, item) => [...prev, { value: item.id, label: item.ten }], []);


    useEffect(() => {
        if (currentEntity) {
            form.setFieldsValue({
                svToiDa: currentEntity.svToiDa,
                namHoc: currentEntity.namHoc,
                hocKy: currentEntity.hocKy,
                chinhanh: currentEntity?.chiNhanh?.id,
                monhoc: currentEntity?.monHoc?.id
            })
        }
    }, [currentEntity])

    const onHandleSubmit = (values) => {
        const entity = {
            svToiDa: +values.svToiDa,
            namHoc: values.namHoc,
            hocKy: +values.hocKy,
            idChiNhanh: values.chinhanh,
            idMonHoc: values.monhoc
        }

        if (isUpdate) {
            dispatch(update({ entity: { id: currentEntity.id, ...entity }, showModal: false }))
        } else {
            dispatch(create({ entity, showModal: false }))
        }

        notification.success({ message: `${isUpdate ? "Cập nhật" : "Thêm mới"} thành công!` })
        form.resetFields();
    }

    const layout = {
        labelCol: {
            sm: { span: 6 },
            xs: { span: 6 },
            md: { span: 6 },
            xl: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 18 },
            sm: { span: 18 },
            md: { span: 18 },
            xl: { span: 18 },
        },
        // style: { marginBottom: 8 }
    };

    return (
        <>
            <Modal
                title="Lớp học phần"
                open={open}
                footer={null}
                onCancel={() => {
                    isUpdate ? dispatch(showModal({ showModal: false, isUpdate: false, currentEntity: {} })) : dispatch(showModal({ showModal: false }));
                    setKey(Math.random());
                    form.resetFields();
                }}
                width="80%"
            >
                <Form
                    onFinish={onHandleSubmit}
                    form={form}
                // key={key}
                >
                    <Row gutter={[8, 8]}>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="svToiDa" label="Số sinh viên tối đa" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="namHoc" label="Năm học" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="hocKy" label="Học kỳ" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="monhoc" label="Môn học" {...layout}>
                                <Select
                                    name="monhoc"
                                    options={optionMH}
                                />
                            </Form.Item>
                        </Col>
                        
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="chinhanh" label="Chi nhánh" {...layout}>
                                <Select
                                    name="chinhanh"
                                    options={optionCN}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button htmlType="submit" type="primary">
                        {isUpdate ? "Cập nhật" : "Thêm"}
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default ModalLopHocPhan