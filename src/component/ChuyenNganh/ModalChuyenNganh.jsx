import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { create, showModal, update } from "../../redux/reducers/chuyennganh.slice";

const ModalChuyenNganh = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState("");
    const [imageId, setImageId] = useState("");
    const [key, setKey] = useState(Math.random());

    const open = useSelector((state) => state.chuyenNganhReducer.showModal)
    const { isUpdate, currentEntity } = useSelector((state) => state.chuyenNganhReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentEntity) {
            form.setFieldsValue({
                ten: currentEntity.ten,
            })
            // setImage(currentEntity.image)
            // setImageId(currentEntity.imageId)
        }
    }, [currentEntity])

    const onHandleSubmit = (values) => {
        const entity = {
            ten: values.ten,
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
                title="Chuyên ngành"
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
                            <Form.Item name="ten" label="Tên" {...layout}>
                                <Input />
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

export default ModalChuyenNganh