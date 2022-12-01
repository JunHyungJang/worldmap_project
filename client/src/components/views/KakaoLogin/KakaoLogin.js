import React from 'react'

function KakaoLogin() {
  
    const REST_API_KEY = "108a1270310b8c3d169b3069324a948b";
    const REDIRECT_URI = "https://localhost:3000/kakao";
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
 
    return (
    <div>
      <h1><a href = {KAKAO_AUTH_URI}> Kakao login</a></h1>
    </div>
  )
}

export default KakaoLogin
