import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useSearch } from "../../../Searchbar/SearchContext";
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
  const { query } = useSearch();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const PER_PAGE = useMemo(() => (isXs ? 1 : isSm ? 2 : 3), [isXs, isSm]);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [items, PER_PAGE]);

  const filteredItems = useMemo(() => {
    let result = items;

    // ✅ Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();

      if (mode === "products") {
        result = result.filter((item) =>
          item.name?.toLowerCase().includes(lowerQuery),
        );
      }

      if (mode === "orders") {
        result = result.filter((order) => {
          const paymentMatch =
            order.paymentMethod?.toLowerCase().includes(lowerQuery) ||
            order.paymentStatus?.toLowerCase().includes(lowerQuery);

          const productMatch = order.items.some((orderItem) =>
            orderItem.name?.toLowerCase().includes(lowerQuery),
          );

          return paymentMatch || productMatch;
        });
      }
    }

    // ✅ Sort by latest first
    return [...result].sort((a, b) => {
      const dateA =
        a.createdAt?.toDate?.() ?? // Firestore Timestamp
        new Date(a.createdAt?.seconds * 1000) ?? // Firestore Timestamp as plain object
        new Date(a.createdAt) ?? // ISO string / ms number
        0;

      const dateB =
        b.createdAt?.toDate?.() ??
        new Date(b.createdAt?.seconds * 1000) ??
        new Date(b.createdAt) ??
        0;

      return dateB - dateA; // descending — latest first
    });
  }, [items, query, mode]);

  const totalPages = Math.ceil(filteredItems.length / PER_PAGE);

  const visibleItems = filteredItems.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        justifyItems="center" // ✅ THIS centers the cards
        gap={{ xs: 2, sm: 3, md: 4 }}
        sx={{
          backgroundColor: "#fafafa",
          p: 1,
          m: 0,
          width: "100%",
          boxSizing: "border-box",
        }}
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
