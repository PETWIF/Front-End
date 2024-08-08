export const SIDE_MENUS = Object.freeze([
  {
    id: 'home',
    to: '/home',
    name: '홈 화면',
    icon: {
      width: 43,
      height: 44,
    },
  },
  {
    id: 'explore',
    to: '/explore',
    name: '탐색',
    icon: {
      width: 42,
      height: 42,
    },
  },
  {
    id: 'album',
    to: '/album',
    name: '앨범',
    icon: {
      width: 42,
      height: 42,
    },
  },
  {
    // 앨범 제작 페이지 이동용 임시 버튼
    id: 'album-create',
    to: '/album-create',
    name: '앨범 제작(임시 버튼)',
    icon: { width: 24, height: 24 },
  },
  {
    id: 'friend',
    to: '/friend',
    name: '친구',
    icon: {
      width: 44,
      height: 44,
    },
  },
  {
    id: 'chatting',
    to: '/chatting',
    name: '채팅',
    icon: {
      width: 34,
      height: 33,
    },
  },
]);
