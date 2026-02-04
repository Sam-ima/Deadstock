import { Box, Pagination, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "../../categoryPage/product/productCard/ProductCard";

const ListingsGrid = ({ items = [], mode = "products", productsMap = {} }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Number of items per page based on screen size
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
        justifyContent="center"
        sx={{ backgroundColor: "#fafafa", p: 2 }}
      >
        {visibleItems.map((item) => {
          const productData =
            mode === "orders"
              ? item.items.map((orderItem) => productsMap[orderItem.productId])
              : item;

          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Orders Mode */}
              {mode === "orders" && (
                <Box
                  sx={{
                    width: { xs: 270, sm: 280, md: 280 },
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box mb={1}>
                    <strong>Ordered At:</strong>{" "}
                    {item.createdAt?.toDate().toLocaleString()}
                  </Box>
                  <Box mb={1}>
                    Payment: {item.paymentMethod} - {item.paymentStatus}
                  </Box>
                  <Box mb={1}>Total: Rs.{item.totalAmount}</Box>
                  <Box mb={1}>
                    <strong>Items:</strong>
                    <Box ml={2} mt={0.5}>
                      {item.items.map((orderItem, idx) => (
                        <Box key={idx} mb={1}>
                          {productsMap[orderItem.productId] ? (
                            <ProductCard
                              product={productsMap[orderItem.productId]}
                            />
                          ) : (
                            <Box>
                              {orderItem.quantity} x {orderItem.name} @ Rs.
                              {orderItem.price} = Rs.{orderItem.subtotal}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <strong>Delivery:</strong> {item.deliveryDetails?.address},{" "}
                    {item.deliveryDetails?.city}, {item.deliveryDetails?.state},{" "}
                    {item.deliveryDetails?.zip}
                  </Box>
                </Box>
              )}

              {/* Products Mode */}
              {mode === "products" && <ProductCard product={item} />}
            </Box>
          );
        })}
      </Box>

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
