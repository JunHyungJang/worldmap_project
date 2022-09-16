import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import Icon, {PlusOutlined, EditOutlined} from '@ant-design/icons'
import axios from 'axios'
// import plus from '@ant-design/icons'

function Fileupload(props) {
  
    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header : {'content-tyle': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/uploadimage', formData, config)
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
                setImages([...Images, response.data.filePath])
                props.refreshFunction([...Images, response.data.filePath])
            }
            else {
                alert('파일을 저장하는데 실패했습니다. ')
            }
        })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)


    }
  
    return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <img src= {require('.//hello.jpg')}/> */}
            
            <Dropzone onDrop = {dropHandler} >
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                    {Images.map((image, index) => (
                        <div onClick={() => deleteHandler(image)} key={index}>
                            <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                                src={`http://localhost:5000/${image}`}
                            />
                        </div>

                    ))}



</div>


        </div>
  )
}

export default Fileupload
