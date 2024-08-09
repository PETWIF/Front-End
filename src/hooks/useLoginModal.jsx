import { useState } from 'react';

import LoginModal from '../components/LoginComponents/LoginModal';

export default function useLoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close, LoginModal };
}