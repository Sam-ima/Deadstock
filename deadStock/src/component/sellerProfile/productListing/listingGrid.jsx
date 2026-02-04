import {
  Box,
  Pagination,
  IconButton,
  useMediaQuery,
  useTheme,
  Switch,
  Typography,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ProductCard from "../../categoryPage/product/productCard/ProductCard";

const ListingsGrid = ({ products = [], onEdit, onDelete, onToggleBidding }) => {
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
        display="flex"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        }}
        gap={{ xs: 2, sm: 3 }}
        justifyContent="center"
        sx={{ backgroundColor: "#fafafa", p: 1 }}
      >
        {visibleProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 🔥 ACTION BAR */}
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: { xs: 270, sm: 280, md: 280 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.75,
                px: 1,
                py: 0.5,
                borderRadius: "999px",
                // backgroundColor: "rgba(255,255,255,0.9)",
                // boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              {/* LEFT: BIDDING */}
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "text.secondary" }}
                >
                  Bidding
                </Typography>

                <Switch
                  size="small"
                  color="success"
                  checked={!product.isDepreciating}
                  onChange={(e) =>
                    onToggleBidding(
                      product.id,
                      e.target.checked ? false : true
                    )
                  }
                />
              </Box>

              {/* RIGHT: ACTIONS */}
              <Box display="flex" alignItems="center" gap={0.5}>
                <IconButton
                  size="small"
                  onClick={() => onEdit(product)}
                  sx={{
                    bgcolor: "#e8f5e9",
                    color: "#2e7d32",
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
                    bgcolor: "#fdecea",
                    color: "#d32f2f",
                    "&:hover": {
                      bgcolor: "#d32f2f",
                      color: "#fff",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* PRODUCT CARD */}
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
