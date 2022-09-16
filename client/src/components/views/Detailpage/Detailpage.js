import React, { useEffect} from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import {RocketOutlined} from '@ant-design/icons'
import {Card} from 'antd'
import {Col, Row} from 'antd'
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios'
import ImageSlider from '../../utils/ImageSlider'

import "antd/dist/antd.min.css";


function Detailpage(props) {
    
    const [Info, setInfo] = useState([])
    const [Limit, setLimit] = useState(8)
    const [Offset, setOffset] = useState(0)
    const [PostSize, setPostSize] = useState(0)

    const {id} = useParams();

    let continent = 'hello'

    if (id === 'af') {
      continent = 'Africa'
    }
    else if (id === 'na'){
      continent = 'North America'
    }
    else if (id === 'as'){
      continent = 'Asia'
    }
    else if (id === 'eu'){
      continent = 'Europe'
    }
    else if (id === 'oc'){
      continent = 'Oceania'
    }
    else if (id === 'sa') {
      continent = 'South America'
    }

    

    useEffect(() => {
      
      let body = {
        'continent': continent,
        'offset': Offset,
        'limit': Limit
      }

      getImages(body)
      
  }, [])

  const getImages = (body) => {
      
    Axios.post('/api/detail',null, {
      params : {
        'continent' : continent,
        'offset' : body.offset,
        'limit': body.limit
        
      }
    })
    .then(response => {
        if (response.data.success) {
          if (body.loadMore){
            setInfo([...Info, ...response.data.data])
          }
          else{
          // console.log(response.data.data)
          setInfo(response.data.data)
          // 왜 여기서 info가 업데이트가 안됌?
          // console.log(Info, "info")
          }
          setPostSize(response.data.data.length)
          // console.log(response.data.data.length)

        }
        else {
          alert('상품을 가져오는데 실패했습니다.')
        }
    })
    // console.log(PostSize)
    // console.log(Info, "info2")

  }



  const renderCards  = Info.map((info,index) => {
    // console.log('image.images', images.images)

    let image_url = JSON.parse(info.images)
    // console.log("imageurl",image_url)
    // console.log(image_url[0])
    return (
      // {<img src = {`http://localhost:5000/${image_url[0]}`}
    <Col lg = {6} md = {8} xs = {24} key = {index}>
    <Card cover = {<ImageSlider multiimages = {image_url}/>}>
      <Meta title = {info.title}/>
    </Card>
    </Col>

    )
  })

  const LoadMoreHandler = () => {
    let new_offset = Offset + Limit  

    let body = {
      'continent': continent,
      'offset': new_offset,
      'limit': Limit,
      'loadMore' : true
    }

    getImages(body)
    setOffset(new_offset)
  }

  
  
    
  
  return (
    <div>
       <div style={{ width: '75%', margin: '3rem auto' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Let's Travel {continent} <RocketOutlined type="rocket" /> </h2>
          </div>
          
          <Row gutter = {[16,16]}>
            {renderCards}
          </Row>
          
          {PostSize >= Limit &&
          <div style = {{justifyContent: 'center'}}>
              <button onClick={LoadMoreHandler}>더보기</button>
          </div>
          }
        </div>
    </div>
  )
}

export default Detailpage
