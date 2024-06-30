import React from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { postProducts } from '../../../redux/slices/productSlice';
import { useDataContext } from '../../../context/context';
const AddProduct = () => {
    const { theme } = useDataContext()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            images: "",
            type: "",
            cal: "",
            flavour: ""

        },
        validationSchema: Yup.object({
            description: Yup.string()
                .required('Product Content Is Required'),
            type: Yup.string()
                .required('Product Type Is Required'),
            title: Yup.string()
                .required('Product Title Is Required'),
            price: Yup.number()
                .min(1, "Product minimum price must be $1")
                .required('Product Price Is Required'),
            images: Yup.string()
                .required('Product Image Is Required'),
            cal: Yup.string()
                .required('Product Calory Is Required'),
            flavour: Yup.string()
                .required('Product Flavour Is Required'),

        }),
        onSubmit: async (values) => {
            const newData = {
                title: values.title.trim(),
                description: values.description.trim(),
                price: values.price,
                images: values.images.trim(),
                type: values.type.trim(),
                cal: values.cal.trim(),
                flavour: values.flavour.trim()
            }
            dispatch(postProducts(newData));
            formik.resetForm()
            navigate('/admin/products')
        },

    });

    return (
        <main className={`addManagement ${theme ? " " : "addLight"}`} >


            <Helmet>
                <title>Add Product</title>
            </Helmet>
            <div className="addManagementInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='addManagementInsideCard'>
                                <div className="addManagementInsideCardBox">
                                    <h4 >Add Product</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="productTitle">Product Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                                name='title'
                                                type="text" id='productTitle' placeholder='Enter Product Title' />
                                            {formik.touched.title && formik.errors.title ? (
                                                <div className='testimonialError'>{formik.errors.title}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="productCalory">Product Calory</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.cal}
                                                name='cal'
                                                type="text" id='productCalory' placeholder='Enter Product Calory' />
                                            {formik.touched.cal && formik.errors.cal ? (
                                                <div className='testimonialError'>{formik.errors.cal}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="productFlavour">Product Flavour</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.flavour}
                                                name='flavour'
                                                type="text" id='productFlavour' placeholder='Enter Product Flavour' />
                                            {formik.touched.flavour && formik.errors.flavour ? (
                                                <div className='testimonialError'>{formik.errors.flavour}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="productImage">Product Image</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.images}
                                                name='images'
                                                type="text" id='productImage' placeholder='Enter Product Image' />
                                            {formik.touched.images && formik.errors.images ? (
                                                <div className='testimonialError'>{formik.errors.images}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="productPrice">Product Price</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.price}
                                                name='price'
                                                type="number" id='productPrice' placeholder='Enter Product Price' />
                                            {formik.touched.price && formik.errors.price ? (
                                                <div className='testimonialError'>{formik.errors.price}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="productType">Product Type</label>
                                            <select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.type}
                                                name='type'
                                                id='productType'
                                                placeholder='Enter Product Type'
                                            >
                                                <option hidden disabled value={''} defaultValue={''} >Select Type</option>
                                                <option value={'Juice'}>Juice</option>
                                                <option value={'Ice-cream'}>Ice-cream</option>
                                            </select>
                                            {formik.touched.type && formik.errors.type ? (
                                                <div className='testimonialError'>{formik.errors.type}</div>
                                            ) : null}
                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="productDescription">Product Description</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                                name='description'
                                                type="text" id='productDescription' placeholder='Enter Product Description' cols="30" rows="10"></textarea>
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className='testimonialError'>{formik.errors.description}</div>
                                            ) : null}
                                        </div>

                                        <div className="managementFormBtn  ">
                                            <button type='submit ' className='btn btn-outline-success  w-100'>
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddProduct
