import React from 'react'
import noData from '../../../assets/images/freepik--Character--inject-70.png'

function NoData() {
  return (

    <div className='text-center py-4'>
        <img src={noData} alt="" />
        <h4 className='mt-2'>No Data!</h4>
        
    </div>

    
  )
}

export default NoData