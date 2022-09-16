import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Title(props) {
    
    const isLogin = props.isLogin
    
    const [Products, setProducts] = useState([])

    useEffect(()=> {
        axios.get("http://localhost:5000/api/test")
        .then(res => {
            console.log(res.data.products);
            setProducts(res.data.products);
        });    
        }, []);
        

    
    // console.log(Products)

    useEffect( ()=> {
        console.log(Products);
        console.log(isLogin)
        console.log(sessionStorage.getItem('user_id'), 'session')
    }, [Products])

    // const onLogout = () => {
    //     sessionStorage.removeItem('user_id')
    //     document.location.href = '/'
    // }

    return (
    <div>
        title
        <div>
        {Products.map(user => {
            return (
            <div key = {user.uid}>
                {user.age}
            </div>)
        })}
        </div>
        {/* <div>
            <button type = 'button' onClick = {onLogout}>Logout</button>
        </div> */}
        
    </div>
  )
}

export default Title
