import React from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { postQuestions } from '../../../redux/slices/faqSlice';
import { useDataContext } from '../../../context/context';
const AddFaq = () => {
    const { theme } = useDataContext()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            type: "",
            title: "",
            content: "",
        },
        validationSchema: Yup.object({
            content: Yup.string()
                .required('Faq Content Is Required'),
            type: Yup.string()
                .required('Faq Type Is Required'),
            title: Yup.string()
                .required('Faq title Is Required'),

        }),
        onSubmit: async (values) => {
            dispatch(postQuestions(values));
            formik.resetForm()
            navigate('/admin/faq')
        },

    });

    return (
        <main className={`addManagement ${theme ? " " : "addLight"}`} >


            <Helmet>
                <title>Add Faq</title>
            </Helmet>
            <div className="addManagementInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='addManagementInsideCard'>
                                <div className="addManagementInsideCardBox">
                                    <h4 >Add Faq</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="faqTitle">Faq Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                                name='title'
                                                type="text" id='faqTitle' placeholder='Enter Faq Title' />
                                            {formik.touched.title && formik.errors.title ? (
                                                <div className='testimonialError'>{formik.errors.title}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="faqType">Faq Type</label>
                                            <select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.type}
                                                name='type'
                                                id='faqType'
                                                placeholder='Enter Faq Type'
                                            >
                                                <option hidden disabled value={''} defaultValue={''} >Select Type</option>
                                                <option value={'Answers To Your Questions'}> Answers To Your Questions</option>
                                                <option value={'Payment Information'}>Payment Information</option>
                                            </select>
                                            {formik.touched.type && formik.errors.type ? (
                                                <div className='testimonialError'>{formik.errors.type}</div>
                                            ) : null}
                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="faqContent">Faq Content</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.content}
                                                name='content'
                                                type="text" id='faqContent' placeholder='Enter Faq Content' cols="30" rows="10"></textarea>
                                            {formik.touched.content && formik.errors.content ? (
                                                <div className='testimonialError'>{formik.errors.content}</div>
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

export default AddFaq
