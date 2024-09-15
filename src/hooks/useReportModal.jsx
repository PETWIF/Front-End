import { useState } from 'react';

import ReportModal from '../components/ReportComponents/ReportModal';

export default function useReportModal() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close, ReportModal };
}
