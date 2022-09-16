import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import Fileupload from '../../utils/Fileupload';
import Axios from 'axios';
import axios from 'axios';
const { TextArea } = Input;
const { Title} = Typography;
 

function UploadImage() {
   
    const Continents = [
        { key: 1, value: "Africa" },
        { key: 2, value: "Europe" },
        { key: 3, value: "Asia" },
        { key: 4, value: "North America" },
        { key: 5, value: "South America" },
        { key: 6, value: "Oceania" }
    ]
   
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])
    

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
        console.log('continent')
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        console.log("제출")
        // event.preventDefault();

        if ( sessionStorage.getItem('user_id') == null) {
            return alert("로그인을 하셔야 이용가능합니다.")
        }
        if (!Title || !Description || !Continent || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }
        console.log(sessionStorage.getItem('user_id'), Title, Description, Images,Continent)
        axios.post('/api/saveimages', null, {
            params : {
            'writer': sessionStorage.getItem('user_id'),
            'title': Title,
            'description': Description,
            'images': Images,
            'continents': Continent
            }
        })
        .then(response => {
            console.log("abcde",response)
            if (response.data.success) {
                alert("상품이 업로드 되었습니다.")
                document.location.href = "/"
            }
            else {
                alert("상품 업로드에 실패했습니다.")
                
            }
        })
    }

    return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>

                <a level = {2}> 여행 사진 업로드</a>
                
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <Fileupload refreshFunction={updateImages} />

                <br />
                <br />
                <label>작품이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                {/* <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br /> */}
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button htmlType="submit" onClick={submitHandler} >
                    확인
                </Button>
            </Form>


        </div>
    )
}

export default UploadImage
