import { Button, Col, Form, Image, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { create, showModal, update, } from "../../redux/reducers/monhoc.slice";

const ModalMonHoc = () => {
    const [form] = Form.useForm();
    const [key, setKey] = useState(Math.random());

    const open = useSelector((state) => state.monHocReducer.showModal)
    const { isUpdate, currentEntity } = useSelector((state) => state.monHocReducer)
    const { chuyennganh } = useSelector((state) => state.chuyenNganhReducer)
    const dispatch = useDispatch()

    const options = chuyennganh.reduce((prev, item) => [...prev, { value: item.id, label: item.ten }], [])

    useEffect(() => {
        if (currentEntity) {
            form.setFieldsValue({
                ten: currentEntity.ten,
                soTc: currentEntity.soTc,
                chuyennganh: currentEntity?.chuyenNganh?.ten
            })
        }
    }, [currentEntity])

    const onHandleSubmit = (values) => {
        const entity = {
            ten: values.ten,
            soTc: +values.soTc,
            idChuyenNganh: values.chuyennganh
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
                title="Môn học"
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
                            <Form.Item name="ten" label="Tên" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="soTc" label="Số tín chỉ" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="chuyennganh" label="Chuyên ngành" {...layout}>
                                <Select
                                    name="chuyennganh"
                                    options={options}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row gutter={[8, 8]} style={{}}>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item label="Ảnh" {...layout}>
                                {image && <Image src={image} width={200} />}
                                {
                                    !image ?
                                        <UploadImage
                                            onUploadFinished={(image) => {
                                                setImage(image.secure_url);
                                                setImageId(image.public_id)
                                            }}
                                            onUploadError={() => {
                                                notification.error({ message: "Lỗi, tải ảnh không thành công!" })
                                            }}
                                            onUploadSuccess={() => {
                                                notification.success({ message: "Tải ảnh thành công!" })
                                            }}
                                        />
                                        :
                                        <Button onClick={handleRemoveImage}>Xóa ảnh</Button>
                                }
                            </Form.Item>
                        </Col>
                    </Row> */}

                    <Button htmlType="submit" type="primary">
                        {isUpdate ? "Cập nhật" : "Thêm"}
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default ModalMonHoc