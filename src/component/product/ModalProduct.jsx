import { Button, Col, Form, Image, Input, Modal, notification, Row, Select } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { showModal } from "../../redux/reducers/product.slice";

const ModalProduct = () => {
    const [form] = Form.useForm();
    const [imageSharing, setImageSharing] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [key, setKey] = useState(Math.random());

    const open = useSelector((state) => state.productReducer.showModal)
    const isUpdate = useSelector((state) => state.productReducer.isUpdate)
    // const currentWebSeo = useSelector((state) => state.productReducer.currentWebSeo)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchAppSettings());
    // }, [])

    // useEffect(() => {
    //     if (currentWebSeo) {
    //         form.setFieldsValue({
    //             appId: currentWebSeo.appId,
    //             descriptionSeo: currentWebSeo.descriptionSeo,
    //             keyword: currentWebSeo.keyword,
    //             metaRobot: currentWebSeo.metaRobot,
    //             seoTitle: currentWebSeo.seoTitle,
    //             slug: currentWebSeo.slug,
    //             titleH1: currentWebSeo.titleH1,
    //             imageSharingTitle: currentWebSeo.imageSharingMeta?.title,
    //             imageSharingAlt: currentWebSeo.imageSharingMeta?.alt,
    //             imageSharingCaption: currentWebSeo.imageSharingMeta?.caption,
    //             imageSharingDesc: currentWebSeo.imageSharingMeta?.description,
    //             jsonLd: currentWebSeo?.jsonLd,
    //         })
    //         setContent(currentWebSeo.content)
    //         setSummary(currentWebSeo.summary)
    //         setImageSharing(currentWebSeo.imageSharing)
    //     }
    // }, [currentWebSeo])

    const onHandleSubmit = (values) => {
        console.log('values', values)
        // const webSeo = {
        //     appId: values.appId,
        //     descriptionSeo: values?.descriptionSeo,
        //     keyword: values?.keyword,
        //     metaRobot: values?.metaRobot,
        //     seoTitle: values?.seoTitle,
        //     slug: values?.slug,
        //     titleH1: values?.titleH1,
        //     imageSharing: imageSharing ? imageSharing : currentWebSeo?.imageSharing,
        //     imageSharingMeta: {
        //         title: values?.imageSharingTitle,
        //         alt: values?.imageSharingAlt,
        //         caption: values?.imageSharingCaption,
        //         description: values?.imageSharingDesc
        //     },
        //     summary,
        //     content,
        //     jsonLd: values.jsonLd,
        // }

        // if (isUpdate) {
        //     dispatch(updateWebSeo({ webSeo: { ...webSeo, _id: currentWebSeo._id }, showModal: false }))
        // } else {
        //     dispatch(createWebSeo({ webSeo, showModal: false }))
        // }
        // notification.success({ message: `${isUpdate ? "Cập nhật" : "Tạo"} thành công` })
        // setContent('');
        // setSummary('');
        // setImageSharing('');
        // form.resetFields();
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
                title="Product"
                open={open}
                footer={null}
                onCancel={() => {
                    isUpdate ? dispatch(showModal({ showModal: false, isUpdate: false, currentProduct: {} })) : dispatch(showModal({ showModal: false }));
                    // setContent('');
                    // setSummary('');
                    // setImageSharing('');
                    // setKey(Math.random());
                    form.resetFields();
                }}
                width="80%"
            >
                <Form
                    onFinish={onHandleSubmit}
                    form={form}
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
                            <Form.Item name="desc" label="Desciption" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="shortDesc" label="Short Description" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item name="image" label="Image" {...layout}>
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>
                    {/* <Row gutter={[8, 8]} style={{}}>
                        <Col span={24} md={12} sm={24}>
                            <Form.Item label="Image Sharing" {...layout}>
                                <Image src={imageSharing} width={200} />
                                <UploadImage
                                    baseFolder="app-seo"
                                    onUploadFinished={(image) => setImageSharing(image)}
                                    onUploadError={() => {
                                        notification.error({ message: "Lỗi, kiểm tra lại" })
                                    }}
                                    onUploadSuccess={() => {
                                        notification.success({ message: "Tải thành công" })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row> */}
                    
                    {/* <Button htmlType="submit" type="primary">
                        {isUpdate ? "Update" : "Create"}
                    </Button> */}

                    <Button htmlType="submit" type="primary">
                        Create
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default ModalProduct