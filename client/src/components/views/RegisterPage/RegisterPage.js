import axios from 'axios'
import React, {useState} from 'react'

function RegisterPage() {
  
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onConfirmHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandelr = (event) => {
        event.preventDefault();
        if (Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        
        axios.post("http://localhost:5000/api/register",null, {
            params : {
                'user_name' : Name,
                'user_id': Email,
                'user_pw': Password
            }
        })
        .then(res => {
            console.log(res)
            alert("회원가입 완료 되었습니다.")
        })
        window.location.replace("/");


    }

    return (
    <div style={{display : 'flex', justifyContent : 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit = {onSubmitHandelr}>
            <label>
                Name
            </label>
            <input type = "text" value = {Name} onChange = {onNameHandler}/>
            <label>
                Email
            </label>
            <input type = "email" value = {Email} onChange = {onEmailHandler}/>
            <label>
                Password
            </label>
            <input type = "password" value = {Password} onChange = {onPasswordHandler}/>
            <label>
                Confirm Password
            </label>
            <input type = "password" value = {ConfirmPassword} onChange = {onConfirmHandler}/>
            <br/>
            <button type = "submit">
                회원가입
            </button>
        </form>
        
    </div>
  )
}

export default RegisterPage
