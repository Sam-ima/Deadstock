import { Button } from "@mui/material";

const ProductImagesSection = ({ onUpload }) => {
  const handleFakeUpload = () => {
    // later replace with Firebase Storage
    onUpload([
      "https://dummyimage.com/600x400",
      "https://dummyimage.com/600x401",
    ]);
  };

  return (
    <Button onClick={handleFakeUpload}>
      Upload Images (Mock)
    </Button>
  );
};

export default ProductImagesSection;
