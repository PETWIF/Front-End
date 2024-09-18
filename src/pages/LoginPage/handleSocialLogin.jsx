import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

import { postGoogleLogin, getKakaoLogin } from '../../apis/login.js'; 

export const KakaoLoginCallback = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
        window.location.replace('/home');
      } else {
        console.error(' 다른 계정에서 이용 중인 이메일입니다. 다른 이메일을 이용해 주세요. 5초 후 로그인 페이지로 이동합니다.');
        setError(' 다른 계정에서 이용 중인 이메일입니다. 다른 이메일을 이용해 주세요. 5초 후 로그인 페이지로 이동합니다.');
        setLoading(false);
      }
    } catch (error) {
      console.error(' 로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요. 5초 후 로그인 페이지로 이동합니다.', error);
      setError(' 로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요. 5초 후 로그인 페이지로 이동합니다.');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleKakaoLogin();
  }, [navigate]);

  useEffectgit (() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [error, navigate]);

  if (loading) {
    return <div>구글 로그인 처리 중...</div>;  
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return null; 
};

export const GoogleLoginCallBack = () => {
    const navigate = useNavigate();
    const { setIsLogin } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
            setLoading(false);
            setIsLogin(true);
            window.location.replace('/home');
          } else {
            console.error(' 다른 계정에서 이용 중인 이메일입니다. 다른 이메일을 이용해 주세요. 5초 후 로그인 페이지로 이동합니다.');
            setError(' 다른 계정에서 이용 중인 이메일입니다. 다른 이메일을 이용해 주세요. 5초 후 로그인 페이지로 이동합니다.');
            setLoading(false);
          }
        } catch (error) {
          console.error(' 로그인 중 에러가 발생했습니다. 5초 후 로그인 페이지로 이동합니다.', error);
          setError(' 로그인 중 에러가 발생했습니다. 5초 후 로그인 페이지로 이동합니다.');
          setLoading(false);
        }
      };      

      handleGoogleLogin();
    }, [navigate]);

    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => {
          navigate('/login');
        }, 5000);

        return () => clearTimeout(timer); 
      }
    }, [error, navigate]);

    if (loading) {
      return <div>구글 로그인 처리 중...</div>;  
    }

    if (error) {
      return <div>{error}</div>; 
    }

    return null;
  };
