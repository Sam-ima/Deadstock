import {
  Box,
  Pagination,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ProductCard from "../../categoryPage/product/productCard/ProductCard";

const ListingsGrid = ({ products = [], onEdit, onDelete }) => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const PER_PAGE = useMemo(() => {
    if (isXs) return 1;
    if (isSm) return 2;
    return 3;
  }, [isXs, isSm]);

  const [page, setPage] = useState(1);

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
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        }}
        gap={{ xs: 2, sm: 3 }}
        justifyItems="center"
      >
        {visibleProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              // backgroundColor:'red',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 🔶 CHANGE 1: ACTION BAR ABOVE CARD */}
            <Box
              sx={{
                width: { xs: "270px", sm: "280px", md: "280px" }, // matches ProductCard
                display: "flex",
                justifyContent: "flex-end",
                mb: 0.5,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                size="small"
                onClick={() => onEdit(product)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "#2e7d32",
                  mr: 0.5,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "#2e7d32",
                    color: "#fff",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                onClick={() => onDelete(product.id)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "#d32f2f",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "#d32f2f",
                    color: "#fff",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* 🔶 CHANGE 2: PRODUCT CARD BELOW */}
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
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