import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, showModal, updateProduct } from "../../redux/reducers/product.slice";

const ModalLopHocPhan = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState("");
    const [imageId, setImageId] = useState("");
    const [key, setKey] = useState(Math.random());

    const open = useSelector((state) => state.productReducer.showModal)
    const { isUpdate, currentProduct } = useSelector((state) => state.productReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentProduct) {
            form.setFieldsValue({
                name: currentProduct.name,
                price: currentProduct.price,
                desc: currentProduct.desc,
                shortDesc: currentProduct.shortDesc,
                category: currentProduct.category,
            })
            setImage(currentProduct.image)
            setImageId(currentProduct.imageId)
        }
    }, [currentProduct])

    const onHandleSubmit = (values) => {
        const product = {
            name: values.name,
            desc: values.desc,
            shortDesc: values.shortDesc,
            category: values.category,
            price: values.price,
            image: image,
            imageId: imageId
        }

        if (isUpdate) {
            dispatch(updateProduct({ product: { _id: currentProduct._id, ...product }, showModal: false }))
        } else {
            dispatch(createProduct({ product, showModal: false }))
        }

        notification.success({ message: `${isUpdate ? "Cập nhật" : "Thêm mới"} thành công!` })
        form.resetFields();
        setImage('');
        setImageId("");
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
                title="Chuyên ngành"
                open={open}
                footer={null}
                onCancel={() => {
                    isUpdate ? dispatch(showModal({ showModal: false, isUpdate: false, currentProduct: {} })) : dispatch(showModal({ showModal: false }));
                    setImage('');
                    setImageId("");
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
                            <Form.Item name="svtoida" label="Số sinh viên tối đa" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="namhoc" label="Năm học" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="hocky" label="Học kỳ" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="monhoc" label="Môn học" {...layout}>
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
                            <Form.Item name="chinhanh" label="Chi nhánh" {...layout}>
                                <Select
                                    name="chinhanh"
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

export default ModalLopHocPhan