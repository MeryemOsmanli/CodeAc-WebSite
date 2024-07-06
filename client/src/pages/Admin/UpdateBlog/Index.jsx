import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBlog, postBlog, updateBlog } from '../../../redux/slices/blogSlice';
import { useDataContext } from '../../../context/context';
const UpdateBlog = () => {
    const { theme } = useDataContext()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { oneBlog } = useSelector(state => state.blogs)



    useEffect(() => {
        dispatch(getOneBlog(id));
    }, [id, dispatch]);
    const jn = oneBlog?.description?.join('\n') || ''
    useEffect(() => {
        if (oneBlog) {
            formik.setValues({
                title: oneBlog.title || '',
                description: jn,
                image: oneBlog.image || '',
                posterTitle: oneBlog.posterTitle || '',
                content: oneBlog.content || '',
                tags: oneBlog.tags || '',
            });
        }
    }, [oneBlog]);

    const formik = useFormik({
        initialValues: {
            title: "",
            image: "",
            posterTitle: "By Admin",
            tags: "",
            description: "",
            content: "",

        },
        validationSchema: Yup.object({
            description: Yup.string()
                .required('Blog Description Is Required'),
            title: Yup.string()
                .required('Blog Title Is Required'),
            content: Yup.string()
                .required('Blog Content Is Required'),
            image: Yup.string()
                .required('Blog Image Is Required'),
            tags: Yup.string()
                .required('Blog Tag Is Required'),

        }),
        onSubmit: async (values) => {
            const splt = values.description.split('\n')
            const newData = {
                title: values.title.trim(),
                description: splt,
                image: values.image.trim(),
                content: values.content.trim(),
                posterTitle: values.posterTitle.trim(),
                tags: values.tags.trim()
            }
            dispatch(updateBlog({ id: oneBlog?._id, newData: newData }));

            formik.resetForm()
            navigate('/admin/blogs')
        },

    });

    return (
        <main className={`addManagement ${theme ? " " : "addLight"}`} >


            <Helmet>
                <title>Update Blog</title>
            </Helmet>
            <div className="addManagementInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='addManagementInsideCard'>
                                <div className="addManagementInsideCardBox">
                                    <h4 >Update Blog</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogTitleU">Blog Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                                name='title'
                                                type="text" id='blogTitleU' placeholder='Enter Blog Title' />
                                            {formik.touched.title && formik.errors.title ? (
                                                <div className='testimonialError'>{formik.errors.title}</div>
                                            ) : null}

                                        </div>

                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogImageU">Blog Image</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.image}
                                                name='image'
                                                type="text" id='blogImageU' placeholder='Enter Blog Image' />
                                            {formik.touched.image && formik.errors.image ? (
                                                <div className='testimonialError'>{formik.errors.image}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogContentU">Blog Content</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.content}
                                                name='content'
                                                type="text" id='blogContentU' placeholder='Enter Blog Content' />
                                            {formik.touched.content && formik.errors.content ? (
                                                <div className='testimonialError'>{formik.errors.content}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogTagU">Blog Tag</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.tags}
                                                name='tags'
                                                type="text" id='blogTagU' placeholder='Enter Blog Tag' />
                                            {formik.touched.tags && formik.errors.tags ? (
                                                <div className='testimonialError'>{formik.errors.tags}</div>
                                            ) : null}

                                        </div>


                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogDescriptionU">Blog Description</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                                name='description'
                                                type="text" id='blogDescriptionU' placeholder='Enter Blog Description' cols="30" rows="10"></textarea>
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

export default UpdateBlog
