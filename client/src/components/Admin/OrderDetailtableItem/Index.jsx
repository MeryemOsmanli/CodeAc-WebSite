import React from 'react'
import moment from 'moment';
const OrderDetailTableItem = ({ item, index }) => {

    return (

        <tr>
            <td> {index + 1}</td>
            <td>
                <img width={50} height={40} src={item.product.images} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item?.product?.title?.slice(0, 15)}.....
            </td>
            <td>
                ${item.product.price}
            </td>
            <td>
                {item.product.type}
            </td>
            <td>
                {item?.product.description?.slice(0, 15)}.....
            </td>
          




        </tr>
    )
}

export default OrderDetailTableItem


