import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect, useMemo } from "react";

import ProductCard from "../../../categoryPage/product/productCard/ProductCard";
import SellingActions from "./SellingActions";
import OrderSummaryCard from "./OrderSummaryCard";
import PaginationControl from "./PaginationControl";

const ListingsGrid = ({
  items = [],
  onEdit,
  onDelete,
  onToggleBidding,
  mode = "products",
  productsMap = {},
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const PER_PAGE = useMemo(() => (isXs ? 1 : isSm ? 2 : 3), [isXs, isSm]);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [items, PER_PAGE]);

  const totalPages = Math.ceil(items.length / PER_PAGE);
  const visibleItems = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{ xs: 2, sm: 3, md: 4 }}
        sx={{ backgroundColor: "#fafafa", p: 2 }}
      >
        {visibleItems.map((item) => (
          <Box
            key={item.id}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {mode === "products" && (
              <>
                <SellingActions
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleBidding={onToggleBidding}
                />
                <ProductCard product={item} />
              </>
            )}

            {mode === "orders" && (
              <OrderSummaryCard order={item} productsMap={productsMap} />
            )}
          </Box>
        ))}
      </Box>

      <PaginationControl
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </>
  );
};

export default ListingsGrid;
