// src/components/BrowseByCategory/BrowsePagination.jsx
import { Box } from '@mui/material';

const BrowsePagination = ({
    browseData,
    cardWidth,
    currentIndex,
    scrollRef,
    theme,
}) => {
    const pages = Math.ceil(browseData.length / 4);

    return (
        <Box display="flex" justifyContent="center" gap={1} mt={3}>
            {Array.from({ length: pages }).map((_, i) => (
                <Box
                    key={i}
                    onClick={() =>
                        scrollRef.current?.scrollTo({
                            left: i * cardWidth * 4,
                            behavior: 'smooth',
                        })
                    }
                    sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor:
                            currentIndex >= i * 4 && currentIndex < (i + 1) * 4
                                ? theme.palette.primary.main
                                : theme.palette.grey[300],
                        cursor: 'pointer',
                    }}
                />
            ))}
        </Box>
    );
};

export default BrowsePagination;
