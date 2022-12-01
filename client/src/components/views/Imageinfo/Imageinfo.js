import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Descriptions} from 'antd'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

function Imageinfo(props) {
    

    const {picture_idx} = useParams();

    const [Imageinfo, setImageinfo] = useState({})

    useEffect (() => {
        // console.log(picture_idx)
        axios.get(`/api/detail/info?id=${picture_idx}&type=single`)
        .then(response => {
            if (response.data.success) {
                // console.log(response.data)
                // console.log(response.data.data)

                setImageinfo(response.data.data[0])
                // Imageinfo.images = JSON.parse(Imageinfo.Images)
                // console.log(Imageinfo)

            }
            else {
                alert('상세 정보를 가져오는데 실패했습니다.')
            }
            // console.log("imageinfo1",Imageinfo)

        })
    }, [])
    console.log("imageinfo2",Imageinfo)
    // console.log(Imageinfo[0])

    if (Imageinfo[0] != null) {
        console.log(Imageinfo[0].title)

    }
    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1>{Imageinfo.title}</h1>
            
        </div>

        <br />

        <Row gutter={[16, 16]} >
            <Col lg={12} sm={24}>
             
                <ProductImage detail={Imageinfo} />
            </Col>
            <Col lg={12} sm={24}>
                {/* ProductInfo */}
                <ProductInfo detail={Imageinfo} />
            </Col>
        </Row>





    </div>
  )
}

export default Imageinfo
