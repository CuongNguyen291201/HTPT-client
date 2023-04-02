import { Button, Col, Form, Image, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, showModal, updateProduct } from "../../redux/reducers/product.slice";
import UploadImage from "../../commons/UploadImage";
import { apiDeleteImageProduct } from "../../api/productApi";

const ModalProduct = () => {
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

        notification.success({ message: `${isUpdate ? "Update" : "Create"} success` })
        form.resetFields();
        setImage('');
        setImageId("");
    }

    const handleRemoveImage = useCallback(async () => {
        await apiDeleteImageProduct(imageId);
        setImage("");
        setImageId("");
    }, [imageId])

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
                title="Product"
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
                            <Form.Item name="name" label="Name" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="price" label="Price" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="category" label="Category" {...layout}>
                                <Select
                                    name="category"
                                    options={[
                                        { value: 1, label: 'Clothing' },
                                        { value: 2, label: 'Music' },
                                        { value: 3, label: 'Poster' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="desc" label="Desciption" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="shortDesc" label="Short Description" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]} style={{}}>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item label="Image" {...layout}>
                                {image && <Image src={image} width={200} />}
                                {
                                    !image ?
                                        <UploadImage
                                            onUploadFinished={(image) => {
                                                setImage(image.secure_url);
                                                setImageId(image.public_id)
                                            }}
                                            onUploadError={() => {
                                                notification.error({ message: "Error, uploaded fail" })
                                            }}
                                            onUploadSuccess={() => {
                                                notification.success({ message: "Upload success" })
                                            }}
                                        />
                                        :
                                        <Button onClick={handleRemoveImage}>Remove Image</Button>
                                }
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button htmlType="submit" type="primary">
                        {isUpdate ? "Update" : "Create"}
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default ModalProduct