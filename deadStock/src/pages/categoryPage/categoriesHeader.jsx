import { Box, Typography, useTheme } from '@mui/material';

const CategoriesHeader = () => {
    const theme = useTheme();

    return (
        <Box textAlign="center" mb={6}>
            <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                    mb: 2,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                All Categories
            </Typography>

            <Typography
                variant="subtitle1"
                color={theme.palette.text.secondary}
                maxWidth={600}
                mx="auto"
            >
                Browse through all categories to find what you’re looking for
            </Typography>
        </Box>
    );
};

export default CategoriesHeader;
