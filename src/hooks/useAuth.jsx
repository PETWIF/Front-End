import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postLogin } from '../apis/login.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState(null);

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const token = localStorage.getItem('accessToken');
    setIsLogin(!!token);

    if (token) {
      setNickname(localStorage.getItem('nickname'));
      setUserId(localStorage.getItem('userId'));
    }
  };

  const handleLogin = async ({ email, password, autoLogin }) => {
    const response = await postLogin({ email, password });
    const { isSuccess, data } = response;

    if (isSuccess) {
      const { accessToken, refreshToken, id, nickname } = data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('nickname', nickname); // 닉네임 저장
      localStorage.setItem('userId', id); // 사용자 ID 저장
      console.log("로그인, 토큰 발급 완료");

      if (autoLogin) {
        localStorage.setItem('autoLogin', 'true');
      }

      setIsLogin(true);
      setNickname(nickname);
      setUserId(id); 
      
      navigate('/home');
    } else {
      throw new Error('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('autoLogin');
    setIsLogin(false);
    setNickname(null);
    setUserId(null);
    console.log("로그아웃, 토큰 삭제 완료");
    navigate('/login');
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, nickname, userId, handleLogin, handleLogout }}> 
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
