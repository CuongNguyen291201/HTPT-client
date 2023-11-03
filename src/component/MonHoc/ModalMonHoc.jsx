import { Button, Col, Form, Image, Input, Modal, notification, Row, Select } from "antd"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, showModal, updateProduct } from "../../redux/reducers/product.slice";
import UploadImage from "../../commons/UploadImage";
import { apiDeleteImageProduct } from "../../api/productApi";

const ModalMonHoc = () => {
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
                title="Môn học"
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
                            <Form.Item name="name" label="Tên" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="tinchi" label="Số tín chỉ" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="chuyennganh" label="Chuyên ngành" {...layout}>
                                <Select
                                    name="chuyennganh"
                                    options={[
                                        { value: 1, label: 'Thời trang' },
                                        { value: 2, label: 'Nhạc cụ' },
                                        { value: 3, label: 'Áp phích' },
                                    ]}
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