import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { getProductById } from "../../services/productService"; // ✅ fetch by ID
import ProductImages from "../categoryPage/productDetail/ProductImages";
import ProductTabs from "../categoryPage/productDetail/ProductTabs";
import AuctionInfo from "./AuctionInfo";

const AuctionDetailPage = () => {
    const { id, title } = useParams(); // ✅ match route params

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    console.log("Product:", product);
    console.log("ID:", id);
    console.log("Title (SEO only):", title);

    useEffect(() => {
        if (!id) return; // 🔥 Prevent undefined Firestore calls

        const loadProduct = async () => {
            try {
                setLoading(true);

                const data = await getProductById(id);

                if (!data) {
                    setProduct(null);
                    return;
                }

                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    // 🔄 Loading State
    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    // ❌ Not Found State
    if (!product) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
                <Typography variant="h5">Product not found!</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
            {/* 🔝 Top Section: Images + Auction Info */}
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={{ xs: 2, md: 4 }}
                alignItems="flex-start"
            >
                <ProductImages
                    product={product}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    isFavorite={isFavorite}
                    setIsFavorite={() => setIsFavorite((prev) => !prev)}
                />

                <AuctionInfo product={product} />
            </Box>

            {/* 📑 Tabs Section */}
            <ProductTabs
                product={product}
                tabValue={tabValue}
                setTabValue={setTabValue}
            />
        </Container>
    );
};

export default AuctionDetailPage;