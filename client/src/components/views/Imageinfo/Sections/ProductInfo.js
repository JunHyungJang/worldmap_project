import React, { useEffect, useState } from 'react'
import { Alert, Button, Descriptions } from 'antd';
import {ConsoleSqlOutlined, HeartOutlined, HeartFilled} from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function ProductInfo(props) {
    

    console.log("detaillll",props.detail)
    const [Like, setLike] = useState(false);

    let user_id = props.detail.writer
    let picture_idx = props.detail.picture_idx
    let location = useLocation();


    const Likeclick = () => {
        if (sessionStorage.getItem('user_id') == null){
            alert('로그인 후 이용가능합니다')
            return
        }
        axios.post('/api/like', null, {
            params: {
                'user_id' : user_id,
                'picture_idx': picture_idx
            }
        })
        .then(response=> {
            // 이미 liked 한 경우
            console.log("liked response")
            console.log(response);
           window.location.reload();
        

                
            }
        
        )
    }

    useEffect(() => {
        if (sessionStorage.getItem('user_id') != null ){

        axios.post('/api/checklike', null, {
            params: {
                'user_id' : user_id,
                'picture_idx': picture_idx
            }
        })
        .then(response =>
            setLike(response.data.success)
            // console.log(Like)
        )
        
       
     
    }
    axios.post('/api/plusview', null, {
        params: {
            'picture_idx': picture_idx
        }
    })
    .then(response => {
        console.log("views updated")
        console.log(response.data.success)
    })
})

    // useEffect(() => {
    //     // axios.get("")
    // }, [props.detail.liked])

    
    return (
        <div>
            <Descriptions title="사진 정보">
                {/* <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item> */}
                <Descriptions.Item label="작성자">{props.detail.user_name}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Like">
                <div>
                    {
                        Like === true
                        ?
                        <HeartFilled onClick={Likeclick} style = {{color : 'red'}}/>
                        :
                        <HeartOutlined onClick={Likeclick} style = {{color : 'red'}}/>



                    }
                    {props.detail.liked}
                </div>
                </Descriptions.Item>
                <Descriptions.Item label="설명">{props.detail.description}</Descriptions.Item>


            </Descriptions>

            <br />
            <br />
            <br />


        </div>
    )
}

export default ProductInfo