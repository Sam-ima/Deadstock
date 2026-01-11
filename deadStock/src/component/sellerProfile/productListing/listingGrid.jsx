import { Box, Pagination, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import ListingCard from "./ListingCard";

const ListingsGrid = ({ products, onEdit, onDelete }) => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600–900
  //   const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // ≥900

  const PER_PAGE = useMemo(() => {
    if (isXs) return 1;
    if (isSm) return 2;
    return 3;
  }, [isXs, isSm]);

  const [page, setPage] = useState(1);

  // Reset page when products OR layout changes
  useEffect(() => {
    setPage(1);
  }, [products, PER_PAGE]);

  const totalPages = Math.ceil(products.length / PER_PAGE);

  const visibleProducts = products.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <>
      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr", // 1 card per row on mobile
          sm: "1fr 1fr", // 2 cards
          md: "1fr 1fr 1fr", // 3 cards
        }}
        gap={{ xs: 1, sm: 3 }}
        justifyItems="center" // ✅ centers cards horizontally
      >
        {visibleProducts.map((item) => (
          <ListingCard
            key={item.id}
            product={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Box>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            size="small"
            siblingCount={0}
            boundaryCount={1}
          />
        </Box>
      )}
    </>
  );
};

export default ListingsGrid;
