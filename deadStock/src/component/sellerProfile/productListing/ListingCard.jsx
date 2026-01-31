// import { Box, Typography, IconButton, Chip, Stack } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import StarIcon from "@mui/icons-material/Star";

// const ListingCard = ({ product, onEdit, onDelete }) => {
//   const {
//     name,
//     currentPrice,
//     basePrice,
//     images,
//     stock,
//     rating,
//     description,
//     features,
//     status,
//   } = product;

//   return (
//     <Box
//       sx={{
//         minWidth: 350,
//         width: { xs: 100, sm: 200, md: 350 },
//         borderRadius: 4,
//         overflow: "hidden",
//         bgcolor: "#fff",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           transform: "translateY(-6px)",
//           boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
//         },
//       }}
//     >
//       {/* IMAGE */}
//       <Box sx={{ position: "relative", height: 150 }}>
//         <Box
//           component="img"
//           src={images?.[0]}
//           alt={name}
//           loading="lazy"
//           sx={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />

//         {/* STATUS */}
//         {/* <Chip
//           label={status === "active" ? "Selling" : "Sold"}
//           color={status === "active" ? "success" : "warning"}
//           size="small"
//           sx={{ position: "absolute", top: 10, left: 10 }}
//         /> */}

//         {/* EDIT */}
//         <IconButton
//           size="small"
//           onClick={() => onEdit(product)}
//           sx={{
//             position: "absolute",
//             top: 10,
//             right: 40,
//             bgcolor: "rgba(255,255,255,0.9)",
//             color: "#2e7d32",
//             "&:hover": {
//               bgcolor: "#2e7d32",
//               color: "#fff",
//             },
//           }}
//         >
//           <EditIcon fontSize="small" />
//         </IconButton>

//         <IconButton
//           size="small"
//           onClick={() => onDelete(product.id)}
//           sx={{
//             position: "absolute",
//             top: 10,
//             right: 10,
//             bgcolor: "rgba(255,255,255,0.9)",
//             color: "#d32f2f",
//             "&:hover": {
//               bgcolor: "#d32f2f",
//               color: "#fff",
//             },
//           }}
//         >
//           <DeleteIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* CONTENT */}
//       <Box p={2}>
//         {/* NAME */}
//         <Typography fontWeight={700} fontSize={16} noWrap>
//           {name}
//         </Typography>

//         {/* PRICE */}
//         <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
//           <Typography fontWeight={700} color="#ff8f00">
//             Rs. {currentPrice}
//           </Typography>

//           {basePrice !== currentPrice && (
//             <Typography
//               fontSize={13}
//               sx={{ textDecoration: "line-through", color: "#999" }}
//             >
//               Rs. {basePrice}
//             </Typography>
//           )}
//         </Stack>

//         {/* RATING & STOCK */}
//         <Stack direction="row" spacing={2} mt={1}>
//           <Stack direction="row" spacing={0.5} alignItems="center">
//             <StarIcon fontSize="small" color="warning" />
//             <Typography fontSize={13}>{rating || 0}</Typography>
//           </Stack>

//           <Typography fontSize={13} color={stock > 0 ? "green" : "red"}>
//             Stock: {stock}
//           </Typography>
//         </Stack>

//         {/* DESCRIPTION */}
//         <Typography fontSize={13} color="text.secondary" mt={1} noWrap>
//           {description}
//         </Typography>

//         {/* FEATURES */}
//         {features?.length > 0 && (
//           <Box mt={1}>
//             {features.slice(0, 2).map((feature, i) => (
//               <Typography key={i} fontSize={12} color="text.secondary">
//                 • {feature}
//               </Typography>
//             ))}
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ListingCard;
