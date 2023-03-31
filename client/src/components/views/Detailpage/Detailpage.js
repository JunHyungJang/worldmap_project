import React, { useEffect} from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import {RocketOutlined,HeartOutlined,HeartFilled} from '@ant-design/icons'
import {Card} from 'antd'
import {Col, Row} from 'antd'
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios'
import ImageSlider from '../../utils/ImageSlider'
import SearchFeature from '../Imageinfo/Sections/SearchFeature'

import "antd/dist/antd.min.css";
// import { Flex } from 'react-flex'


function Detailpage(props) {
    
    const [Info, setInfo] = useState([])
    const [Limit, setLimit] = useState(8)
    const [Offset, setOffset] = useState(0)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerm, setSearchTerm] = useState("")

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
  // process.env.REACT_APP_DB_HOST + '/api/test'
  const getImages = (body) => {
    console.log()
    Axios.post("http://localhost:5000/api/detail",null, {
      params : {
        'continent' : continent,
        'offset' : body.offset,
        'limit': body.limit,
        'SearchTerm' : body.SearchTerm
        
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
    // console.log(info)
    // console.log(info)
    let image_url = JSON.parse(info.images)
    // console.log("imageurl",image_url)
    // console.log(image_url[0])
    let liked_string = (info.liked).toString()


    return (
      // {<img src = {`http://localhost:5000/${image_url[0]}`}
    <Col lg = {6} md = {8} xs = {24} key = {index}>
    <Card cover = {<a href = {`/${id}/${info.picture_idx}`}><ImageSlider multiimages = {image_url}/></a>}>
      <Meta title = {info.title}>
      {/* <HeartOutlined/> */}
      </Meta>
      {/* <Meta liked = {info.liked}/> */}
    </Card>
    <div style = {{display: 'flex',  flexDirection: 'row'}}>
    <HeartFilled style = {{color : 'red'}}/>
    {info.liked}
    </div>

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

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm)

    let body = {
      'limit' : Limit,
      'offset' : Offset,
      'SearchTerm' : newSearchTerm
    }

    setOffset(0)
    setSearchTerm(newSearchTerm)
    getImages(body)

    
  }
  
  
    
  
  return (
    <div>
       <div style={{ width: '75%', margin: '3rem auto' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Let's Travel {continent} <RocketOutlined type="rocket" /> </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
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
