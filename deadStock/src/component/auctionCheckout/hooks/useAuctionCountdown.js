// hooks/useCountdown.js
import { useState, useEffect } from "react";

const useCountdown = (deadline, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!deadline) return;

    const target = deadline?.toDate ? deadline.toDate() : new Date(deadline);

    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setTimeLeft(null);
        onExpire?.();
        return;
      }
      setTimeLeft({
        hours:   Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return timeLeft;
};

export default useCountdown;