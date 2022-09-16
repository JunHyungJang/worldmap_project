import axios from 'axios'
import React, {useState} from 'react'

function LoginPage() {
  
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("email", Email)
        console.log('password', Password)

        let body = {
            email: Email,
            password : Password
        }

        // dispatch(loginUser(body))
        axios.post("http://localhost:5000/api/login", null, {
            params: {
                'user_id': Email,
                'user_pw': Password
            }
        })
        .then(res => {
            console.log(res)
            console.log(res.data.userId)
            console.log(res.data.userPw)

            if (res.data.userId === undefined){
                console.log('==============', res.data.msg)
                alert('입력하신 id가 일치하지 않습니다')
            } 
            else if (res.data.userId === null){
                console.log('==============', '입력하신 비밀번호가 일치하지 않습니다.')
                alert('입력하신 비밀번호가 일치하지 않습니다')
            }
            else if (res.data.userId === Email) {
                console.log('==============', '로그인 성공')
                sessionStorage.setItem('user_id', Email)
                console.log(sessionStorage.getItem('user_id'))
            }
            document.location.href = "/"


        })
        .catch()
    }   

    return (
    <div style = {{display : 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
      <form style = {{display : 'flex', flexDirection: 'column'}}
        onSubmit = {onSubmitHandler}>
        <label>
            Email
        </label>
        <input type="email" value= {Email} onChange = {onEmailHandler}/>
        <label>Password</label>
        <input type= "password" value= {Password} onChange = {onPasswordHandler}/>
        <br/>
        <button>
            Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
