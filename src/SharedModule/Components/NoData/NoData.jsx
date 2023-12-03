import React from 'react'
import noData from '../../../assets/images/freepik--Character--inject-70.png'

function NoData() {
  return (

    <div className='text-center'>
        <img src={noData} alt="" />
        <h4 className='mt-2'>No Data!</h4>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>

    
  )
}

export default NoData