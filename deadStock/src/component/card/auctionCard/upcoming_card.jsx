// import { Card, Typography, Box, Button, Chip } from "@mui/material";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import ScheduleIcon from "@mui/icons-material/Schedule";

// const UpcomingAuctionCard = ({ product }) => {
//   const auction = product?.auction;

//   // ✅ Resolve main image safely
//   const imageUrl =
//     product?.images?.find((img) => img.isMain)?.url ||
//     product?.images?.[0]?.url ||
//     "/placeholder.jpg";

//   // ✅ Bid logic
//   const displayBid =
//     auction?.highestBid && auction.highestBid > 0
//       ? auction.highestBid
//       : auction?.startingBid;

//   // ✅ Time formatting
//   const startTime = auction?.startTime?.toDate
//     ? auction.startTime.toDate().toLocaleString()
//     : "TBA";

//   return (
//     <Card
//       sx={{
//         position: "relative",
//         width: 260,
//         height: 320,
//         borderRadius: "18px",
//         overflow: "hidden",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
//         transition: "0.35s ease",
//         "&:hover": {
//           transform: "translateY(-8px)",
//           boxShadow: "0 16px 45px rgba(0,0,0,0.25)",
//         },
//       }}
//     >
//       {/* Product Image */}
//       <Box
//         component="img"
//         src={imageUrl}
//         alt={product?.name}
//         loading="lazy"
//         sx={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//         }}
//       />

//       {/* Dark gradient overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.85))",
//         }}
//       />

//       {/* Status badge */}
//       <Chip
//         label="Scheduled"
//         size="small"
//         sx={{
//           position: "absolute",
//           top: 12,
//           left: 12,
//           backgroundColor: "#d8a855",
//           color: "#000",
//           fontWeight: 700,
//         }}
//       />

//       {/* Card Content */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: 14,
//           left: 14,
//           right: 14,
//           zIndex: 2,
//         }}
//       >
//         {/* Product name */}
//         <Typography
//           sx={{
//             color: "#fff",
//             fontWeight: 700,
//             fontSize: "1rem",
//             lineHeight: 1.3,
//           }}
//           noWrap
//         >
//           {product?.name}
//         </Typography>

//         {/* Highest bid */}
//         <Typography
//           sx={{
//             mt: 0.5,
//             fontSize: "0.9rem",
//             color: "#ffd27d",
//             fontWeight: 600,
//           }}
//         >
//           Highest Bid: ₹{displayBid}
//         </Typography>

//         {/* Stock info */}
//         <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
//           <Inventory2OutlinedIcon
//             sx={{ fontSize: 16, color: "#ccc", mr: 0.5 }}
//           />
//           <Typography sx={{ fontSize: "0.8rem", color: "#ccc" }}>
//             Available: {product?.availableStock}
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             mt: 0.5,
//             color: "grey.300",
//           }}
//         >
//           <Inventory2OutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
//           <Typography variant="caption">
//             Available: {product?.availableStock || 0}
//           </Typography>
//         </Box>

//         {/* Start time */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             mt: 1,
//             color: "grey.400",
//           }}
//         >
//           <ScheduleIcon sx={{ fontSize: 14, mr: 0.5 }} />
//           <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
//             Starts: {startTime}
//           </Typography>
//         </Box>

//         {/* CTA */}
//         <Button
//           fullWidth
//           size="small"
//           variant="outlined"
//           startIcon={<NotificationsActiveIcon />}
//           sx={{
//             mt: 1.5,
//             color: "#fff",
//             borderColor: "#d8a855",
//             borderRadius: "20px",
//             fontWeight: 600,
//             "&:hover": {
//               backgroundColor: "#d8a85522",
//               borderColor: "#d8a855",
//             },
//           }}
//         >
//           Remind Me
//         </Button>
//       </Box>
//     </Card>
//   );
// };

// export default UpcomingAuctionCard;
