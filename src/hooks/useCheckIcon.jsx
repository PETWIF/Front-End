import { useState } from 'react';

export default function useCheckIcon() {
  const [isChecked, setIsChecked] = useState(false);
  const checking = () => setIsChecked(!isChecked);

  return { isChecked, checking };
}
