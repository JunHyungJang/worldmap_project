import React, {useEffect} from 'react'
import axios from 'axios';
import {RocketOutlined} from '@ant-design/icons'



function LandingPage() {
    
  
    useEffect(() => {
        axios.post('/api/landingimages')
        .then(response => {
            if (response.data.success) {
              console.log(response.data)
            }
            else {
              alert('상품을 가져오는데 실패했습니다.')
            }
        })
    }, [])
  
    return (
      <div style={{ width: '75%', margin: '3rem auto' }}>

      <div style={{ textAlign: 'center' }}>
          <h2>Let's Travel Anywhere <RocketOutlined  /> </h2>
      </div>
      </div>
    )
}

export default LandingPage
