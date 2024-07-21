import React from 'react'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteOurTeam, getOneOurTeam } from '../../../redux/slices/ourTeamSlice';
const OurTeamTableItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={item.image} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.title}
            </td>
            <td>
                {item.content}
            </td>

            <td>
                <Link to={`/admin/ourTeam/${item._id}`}>
                    <Button color='primary'>
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>
            <td>
                <Link to={`/admin/ourTeam/edit/${item._id}`} onClick={() => {
                    dispatch(getOneOurTeam(item._id))
                }}>
                    <Button color='warning'>
                        <Icon path={mdiFileEdit} size={1} />

                    </Button>
                </Link>
            </td>
            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteOurTeam(item._id))
                }} className='deleteBtnInTestimonials'>
                    <span className='testimonialFirstDelete'>
                        <Icon path={mdiDelete} size={1} />
                    </span>
                    <span className='testimonialSecondDelete'>
                        <Icon path={mdiDeleteEmpty} size={1} />

                    </span>
                </Button>
            </td>
        </tr>
    )
}

export default OurTeamTableItem
