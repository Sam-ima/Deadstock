import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const sellerActions = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({
        ...product,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddProduct = () => {
    if (!product.name || !product.price || !product.image) {
      alert("Please fill all required fields!");
      return;
    }
    onAddProduct(product); // Pass product to parent
    // Reset form
    setProduct({
      name: "",
      price: "",
      description: "",
      image: null,
      imagePreview: null,
    });
  };

  return (
    <Box mb={3} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Add New Product</Typography>

      <TextField
        label="Product Name"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Price"
        name="price"
        value={product.price}
        onChange={handleInputChange}
        type="number"
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={product.description}
        onChange={handleInputChange}
        multiline
        rows={3}
        fullWidth
      />
      <Button variant="contained" component="label">
        Upload Image
        <input hidden type="file" accept="image/*" onChange={handleImageChange} />
      </Button>
      {product.imagePreview && (
        <Box mt={1}>
          <Typography variant="subtitle2">Preview:</Typography>
          <img
            src={product.imagePreview}
            alt="Preview"
            style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        color="success"
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
    </Box>
  );
};

export default sellerActions;
