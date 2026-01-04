// src/components/BrowseByCategory/useBrowseAutoScroll.js
import { useEffect } from 'react';

const useBrowseAutoScroll = ({
  scrollRef,
  enabled,
  isMobile,
  cardWidth,
  dataLength,
  setCurrentIndex,
}) => {
  useEffect(() => {
    let interval;

    if (enabled && !isMobile && scrollRef.current) {
      interval = setInterval(() => {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const nextScroll = container.scrollLeft + cardWidth;

        if (nextScroll >= maxScroll) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
          setCurrentIndex(0);
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
          setCurrentIndex(prev => (prev + 1) % dataLength);
        }
      }, 2000);
    }

    return () => interval && clearInterval(interval);
  }, [enabled, isMobile, cardWidth, dataLength, scrollRef, setCurrentIndex]);
};

export default useBrowseAutoScroll;
