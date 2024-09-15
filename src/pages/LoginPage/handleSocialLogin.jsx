import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postGoogleLogin, getKakaoLogin } from '../../apis/login.js'; 

export const KakaoLoginCallback = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    const code = new URL(window.location.href).searchParams.get('code');

    try {
      const response = await getKakaoLogin({ code });
      const { isSuccess, data } = response;
      const { accessToken, refreshToken } = data;

      if (isSuccess)  {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
                    
        console.log("로그인 성공! 홈으로 이동합니다...");
        window.location.replace('/home');
      } else {
        console.error('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('로그인 중 에러 발생. 다시 시도해 주세요.', error);
    }
  };

  useEffect(() => {
    handleKakaoLogin();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export const GoogleLoginCallBack = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleGoogleLogin = async () => {
        const code = new URL(document.location.toString()).searchParams.get('code');
      
        try {
          const response = await postGoogleLogin({ code });
          const { isSuccess, data } = response;
      
          if (isSuccess) {
            const { accessToken, refreshToken } = data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            
            console.log("로그인 성공! 홈으로 이동합니다...");
            window.location.replace('/home');
          } else {
            console.error('로그인에 실패했습니다. 다시 시도해 주세요.');
          }
        } catch (error) {
          console.error('로그인에 실패했습니다. 다시 시도해 주세요.', error);
        }
      };      

      handleGoogleLogin();
    }, [navigate]);
  
    return <div>구글 로그인 처리 중...</div>;
  };