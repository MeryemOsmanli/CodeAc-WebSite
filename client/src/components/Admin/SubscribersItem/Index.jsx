import React from 'react'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty } from '@mdi/js';
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteSubscribers } from '../../../redux/slices/subscribersSlice';
const SubscribersItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                {item.subscriberGmail}
            </td>
          


            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteSubscribers(item._id))
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

export default SubscribersItem
