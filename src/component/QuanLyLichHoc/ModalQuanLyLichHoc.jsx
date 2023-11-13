import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { create, showModal, update } from "../../redux/reducers/lichhoc.slice";

const ModalQuanLyLichHoc = () => {
    const [form] = Form.useForm();
    const [key, setKey] = useState(Math.random());

    const open = useSelector((state) => state.lichHocReducer.showModal)
    const { isUpdate, currentEntity } = useSelector((state) => state.lichHocReducer)
    const dispatch = useDispatch()

    const { giangvien } = useSelector((state) => state.giangVienReducer)
    const { lophocphan } = useSelector((state) => state.lopHocPhanReducer)

    const optionGV = giangvien.reduce((prev, item) => [...prev, { value: item.id, label: item.ten }], []);
    const optionLHP = lophocphan.reduce((prev, item) => [...prev, { value: item.id, label: item.ten }], []);

    useEffect(() => {
        if (currentEntity) {
            form.setFieldsValue({
                thu: currentEntity.thu,
                kip: currentEntity.kip,
                phong: currentEntity.phong,
                giangVien: currentEntity?.giangVien?.id,
                lopHocPhan: currentEntity?.lopHocPhan?.id
            })
        }
    }, [currentEntity])

    const onHandleSubmit = (values) => {
        const entity = {
            thu: values.thu,
            kip: values.kip,
            phong: values.phong,
            giangVien: +values?.giangVien,
            lopHocPhan: +values?.lopHocPhan
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
                title="Quản lý lịch học"
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
                            <Form.Item name="thu" label="Thứ" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="kip" label="Kíp" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="phong" label="Phòng" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="giangVien" label="Giảng viên" {...layout}>
                                <Select
                                    name="giangVien"
                                    options={optionGV}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="lopHocPhan" label="Lớp học phần" {...layout}>
                                <Select
                                    name="lopHocPhan"
                                    options={optionLHP}
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

export default ModalQuanLyLichHoc