import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Icon from '@mdi/react';
import { getOneQuestions } from '../../../redux/slices/faqSlice';
import { useDataContext } from '../../../context/context';


const FaqDetail = () => {
    const dispatch = useDispatch()
    const { theme } = useDataContext()
    const { oneQuestion, questionsLoading } = useSelector(state => state.questions)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneQuestions(id))
    }, [id])
    return (
        <main className={`questionDetail ${theme ? "" : "adminDetail2Light"}`}>
            <Helmet>
                <title>Question Detail</title>
            </Helmet>
            <div className="questionDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="questionDetailInsideCard">
                                {
                                    questionsLoading == true ? <p className='questionDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="questionDetailCardBox">

                                        <div className="questionDetailCardBoxBottom">
                                            <p className="questionTitle">
                                                {oneQuestion?.title}
                                            </p>
                                            <span className="questionRating">
                                                {oneQuestion?.type}

                                            </span>
                                            <p className="questionContent">
                                                {oneQuestion?.content}
                                            </p>
                                        </div>
                                        <button className="questionGoBackBtn btn btn-dark">
                                            <Link to={'/admin/faq'}>
                                                Go Back
                                            </Link>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default FaqDetail

