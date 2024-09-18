import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

import { postGoogleLogin, getKakaoLogin } from '../../apis/login.js'; 

export const KakaoLoginCallback = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useAuth();

  const handleKakaoLogin = async () => {
    const code = new URL(window.location.href).searchParams.get('code');

    try {
      const response = await getKakaoLogin({ code });
      const { isSuccess, data } = response;
      const { accessToken, refreshToken, id, nickname, profile_url } = data;

      if (isSuccess)  {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('nickname', nickname); 
        localStorage.setItem('userId', id); 
        localStorage.setItem('profile_url', profile_url); 
                    
        console.log("로그인 성공! 홈으로 이동합니다...");
        setIsLogin(true);
        window.location.replace('/home');
      } else {
        console.error('로그인에 실패했습니다. 다시 시도해 주세요.');
        return <div>다른 계정에서 이용 중인 이메일입니다. 다른 계정을 이용해 주세요.</div>
      }
    } catch (error) {
      console.error('로그인 중 에러 발생. 다시 시도해 주세요.', error);
      return <div>로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>
    }
  };

  useEffect(() => {
    handleKakaoLogin();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export const GoogleLoginCallBack = () => {
    const navigate = useNavigate();
    const { setIsLogin } = useAuth();
  
    useEffect(() => {
      const handleGoogleLogin = async () => {
        const code = new URL(document.location.toString()).searchParams.get('code');
      
        try {
          const response = await postGoogleLogin({ code });
          const { isSuccess, data } = response;
      
          if (isSuccess) {
            const { accessToken, refreshToken, id, nickname, profile_url } = data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('nickname', nickname); 
            localStorage.setItem('userId', id); 
            localStorage.setItem('profile_url', profile_url);
            
            console.log("로그인 성공! 홈으로 이동합니다...");
            setIsLogin(true);
            window.location.replace('/home');
          } else {
            console.error('로그인에 실패했습니다. 다시 시도해 주세요.');
            return <div>다른 계정에서 이용 중인 이메일입니다. 다른 계정을 이용해 주세요.</div>
          }
        } catch (error) {
          console.error('로그인에 실패했습니다. 다시 시도해 주세요.', error);
          return <div>로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>
        }
      };      

      handleGoogleLogin();
    }, [navigate]);
  
    return <div>구글 로그인 처리 중...</div>;
  };