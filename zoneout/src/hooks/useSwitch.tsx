import { useState } from "react";

interface UseSwitchProps {
    isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  onEnd: () => void;
  onStart: () => void;
}

const useSwitch = (initialState: boolean): UseSwitchProps => {
  const [isActive, setIsActive] = useState(initialState);

  const onStart = () => {
    setIsActive(true);
  };

  const onEnd = () => {
    setIsActive(false);
  };

  return {
    isActive,
    setIsActive,
    onStart,
    onEnd,
  };
};

export default useSwitch;
