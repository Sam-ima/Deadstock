import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import ProductCard from "./productCard";
import AddProductDialog from "./addProdcutDialog";
import SellerData from "../data/sellerData";

const sellerProduct = () => {
  const [products, setProducts] = useState(SellerData);
  const [open, setOpen] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Typography variant="h6" mb={1}>
        My Products
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="success"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Product
      </Button>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
        />
      ))}

      <AddProductDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddProduct}
      />
    </>
  );
};

export default sellerProduct;
