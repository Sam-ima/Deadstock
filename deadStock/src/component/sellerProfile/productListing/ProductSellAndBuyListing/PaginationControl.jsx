import { Box, Pagination } from "@mui/material";

const PaginationControl = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onChange(value)}
        size="small"
        siblingCount={0}
        boundaryCount={1}
      />
    </Box>
  );
};

export default PaginationControl;
