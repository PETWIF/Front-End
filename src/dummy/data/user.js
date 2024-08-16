let users = [
  {
    id: '1',
    name: '임도이',
    email: 'doirang1@gmail.com',
    age: '24',
    nickname: '되',
    password: 'qaz121!',
  },
  {
    id: '2',
    name: '일론 머스크',
    email: 'elone@gmail.com',
    age: '45',
    nickname: '테슬라',
    password: 'elon1004!',
  },
];

export const mockPostSignup = async (formData) => {
  // 회원가입 - 더미 데이터 확인
  const existingUser = users.find((user) => user.email === formData.email);
  if (existingUser) {
    // 이미 정보가 존재하는 경우 후에 로그인 페이지로 가도록 연결해야 할 듯
    throw new Error('User already exists');
  }

  users.push({
    ...formData,
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });
  return { email: formData.email };
};

export const mockPostLogin = async (formData) => {
  // 로그인 - 이메일과 비밀번호 확인
  const user = users.find((user) => user.email === formData.email);
  if (!user) {
    throw new Error('User not found');
  }

  // 비밀번호 확인
  if (user.password !== formData.password) {
    throw new Error('Incorrect password');
  }

  return { email: user.email, name: user.name };
};

export const mockPostPwdSearch = async (formData) => {
  // 비밀번호 찾기 - 가입된 이메일인지 확인
  const user = users.find((user) => user.email === formData.email);
  if (!user) {
    throw new Error('User not found');
  }

  return { email: user.email };
};

export const mockPostSetNickname = async (email, formData) => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error('User not found');
  }

  Object.assign(user, formData); 
  return user;
};

export const mockPostAddInfo = async (email, formData) => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error('User not found');
  }

  Object.assign(user, formData); 
  return user;
};