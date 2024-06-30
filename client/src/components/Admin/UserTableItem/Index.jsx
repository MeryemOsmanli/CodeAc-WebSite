import React from 'react'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiInformation } from '@mdi/js';
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const UserTableItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`${item.profileImage}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.fullName}
            </td>
            <td>
                {item.username}
            </td>
            <td>
                {item.gmail}
            </td>

   

            <td >
                <Button color='error' onClick={async () => {
                    await dispatch(deleteUser(item._id))
                    toast.success('User Successfully Deleted')

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

export default UserTableItem
