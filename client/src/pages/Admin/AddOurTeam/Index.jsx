import React from 'react'
import { postOurTeam } from '../../../redux/slices/ourTeamSlice';
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useDataContext } from '../../../context/context';
const AddOurTeam = () => {
    const { theme } = useDataContext()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            image: "",
            title: "",
            content: "",

        },
        validationSchema: Yup.object({
            content: Yup.string()
                .required('Our Team Profession Is Required'),
            image: Yup.string()
                .required('Our Team Image Is Required'),
            title: Yup.string()
                .required('Our Team title Is Required'),

        }),
        onSubmit: async (values) => {
            dispatch(postOurTeam(values));
            formik.resetForm()
            navigate('/admin/ourTeam')
        },

    });

    return (
        <main className={`addManagement ${theme ? " " : "addLight"}`} >

            <Helmet>
                <title>Add Our Team</title>
            </Helmet>
            <div className="addManagementInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='addManagementInsideCard'>
                                <div className="addManagementInsideCardBox">
                                    <h4 >Add Our Team</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="ourTeamTitle">Team Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                                name='title'
                                                type="text" id='ourTeamTitle' placeholder='Enter Team Title' />
                                            {formik.touched.title && formik.errors.title ? (
                                                <div className='testimonialError'>{formik.errors.title}</div>
                                            ) : null}

                                        </div>

                                        <div className="addManagementFormItem ">
                                            <label htmlFor="managementProfession">Team Profession</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.content}
                                                name='content'
                                                type="text" id='managementProfession' placeholder='Enter Team Profession' />
                                            {formik.touched.content && formik.errors.content ? (
                                                <div className='testimonialError'>{formik.errors.content}</div>
                                            ) : null}
                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="teamImage">Team Image</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.image}
                                                name='image'
                                                type="text" id='teamImage' placeholder='Enter Team Image' />
                                            {formik.touched.image && formik.errors.image ? (
                                                <div className='testimonialError'>{formik.errors.image}</div>
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

export default AddOurTeam
