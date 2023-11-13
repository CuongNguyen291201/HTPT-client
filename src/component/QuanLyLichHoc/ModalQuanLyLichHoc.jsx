import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { create, showModal, update } from "../../redux/reducers/lichhoc.slice";

const ModalQuanLyLichHoc = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState("");
    const [imageId, setImageId] = useState("");
    const [key, setKey] = useState(Math.random());

    const open = useSelector((state) => state.lichHocReducer.showModal)
    const { isUpdate, currentEntity } = useSelector((state) => state.lichHocReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentEntity) {
            form.setFieldsValue({
                name: currentEntity.name,
                price: currentEntity.price,
                desc: currentEntity.desc,
                shortDesc: currentEntity.shortDesc,
                category: currentEntity.category,
            })
            // setImage(currentEntity.image)
            // setImageId(currentEntity.imageId)
        }
    }, [currentEntity])

    const onHandleSubmit = (values) => {
        const entity = {
            name: values.name,
            desc: values.desc,
            shortDesc: values.shortDesc,
            category: values.category,
            price: values.price,
            image: image,
            imageId: imageId
        }

        if (isUpdate) {
            dispatch(update({ entity: { id: currentEntity.id, ...entity }, showModal: false }))
        } else {
            dispatch(create({ entity, showModal: false }))
        }

        notification.success({ message: `${isUpdate ? "Cập nhật" : "Thêm mới"} thành công!` })
        form.resetFields();
        // setImage('');
        // setImageId("");
    }

    // const handleRemoveImage = useCallback(async () => {
    //     await apiDeleteImageProduct(imageId);
    //     setImage("");
    //     setImageId("");
    // }, [imageId])

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
                    // setImage('');
                    // setImageId("");
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
                            <Form.Item name="giangvien" label="Giảng viên" {...layout}>
                                <Select
                                    name="monhoc"
                                    options={[
                                        { value: 1, label: 'Thời trang' },
                                        { value: 2, label: 'Nhạc cụ' },
                                        { value: 3, label: 'Áp phích' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="lophocphan" label="Lớp học phần" {...layout}>
                                <Select
                                    name="lophocphan"
                                    options={[
                                        { value: 1, label: 'Thời trang' },
                                        { value: 2, label: 'Nhạc cụ' },
                                        { value: 3, label: 'Áp phích' },
                                    ]}
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