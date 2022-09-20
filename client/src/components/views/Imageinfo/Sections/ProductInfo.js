import React, { useEffect } from 'react'
import { Button, Descriptions } from 'antd';
import {ConsoleSqlOutlined, HeartOutlined} from '@ant-design/icons';
import axios from 'axios';
function ProductInfo(props) {
    

    console.log("detaillll",props.detail)

    let user_id = props.detail.writer
    let picture_idx = props.detail.picture_idx

    const Likeclick = () => {
        axios.post('/api/like', null, {
            params: {
                'user_id' : user_id,
                'picture_idx': picture_idx
            }
        })
        .then(response=> {
            // 이미 liked 한 경우
           console.log(response)

                
            }
        )
    }

    
    return (
        <div>
            <Descriptions title="Image Info">
                {/* <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item> */}
                <Descriptions.Item label="writer">{props.detail.user_name}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Like">{props.detail.liked}
                <HeartOutlined onClick={Likeclick}/></Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>


            </Descriptions>

            <br />
            <br />
            <br />


        </div>
    )
}

export default ProductInfo