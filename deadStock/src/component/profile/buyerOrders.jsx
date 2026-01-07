// // import {
// //   Box,
// //   Typography,
// //   IconButton,
// //   Avatar,
// //   Paper,
// //   Chip,
// //   Divider,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   TextField,
// // } from "@mui/material";

// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import SettingsIcon from "@mui/icons-material/Settings";
// // import EditIcon from "@mui/icons-material/Edit";
// // import LogoutIcon from "@mui/icons-material/Logout";

// // import { useState } from "react";

// // const orders = [
// //   {
// //     id: 1,
// //     product: 'Nike Dunk Low "Panda"',
// //     price: 250,
// //     size: "10 US",
// //     date: "Oct 24, 2023",
// //     status: "DELIVERED",
// //   },
// //   {
// //     id: 2,
// //     product: "Supreme Box Logo Tee",
// //     price: 120,
// //     size: "L",
// //     date: "Oct 20, 2023",
// //     status: "SHIPPED",
// //   },
// //   {
// //     id: 3,
// //     product: 'Yeezy Slide "Bone"',
// //     price: 90,
// //     size: "11 US",
// //     date: "Oct 18, 2023",
// //     status: "PROCESSING",
// //   },
// // ];

// // const statusStyle = status => {
// //   if (status === "DELIVERED")
// //     return { bg: "#e8f7ef", color: "#2ecc71" };
// //   if (status === "SHIPPED")
// //     return { bg: "#e8f4fd", color: "#3498db" };
// //   return { bg: "#fff4e5", color: "#f39c12" };
// // };

// // const buyerProfile = () => {
// //   const [user, setUser] = useState({
// //     name: "Jordan Smith",
// //     username: "@jordankicks",
// //     email: "j.smith@example.com",
// //     phone: "+1 (555) 000-0000",
// //     address: "123 Sneaker St, Apt 4B, New York",
// //   });

// //   const [editOpen, setEditOpen] = useState(false);
// //   const [logoutOpen, setLogoutOpen] = useState(false);
// //   const [tempUser, setTempUser] = useState(user);

// //   const handleSave = () => {
// //     setUser(tempUser);
// //     setEditOpen(false);
// //   };

// //   return (
// //     <Box bgcolor="#fff" minHeight="100vh" maxWidth={430} mx="auto">

// //       {/* TOP BAR */}
// //       <Box display="flex" justifyContent="space-between" px={2} py={1.5}>
// //         <IconButton onClick={() => alert("Go back")}>
// //           <ArrowBackIcon />
// //         </IconButton>

// //         <Typography fontWeight={600}>Profile</Typography>

// //         <IconButton onClick={() => alert("Open settings")}>
// //           <SettingsIcon />
// //         </IconButton>
// //       </Box>

// //       {/* PROFILE HEADER */}
// //       <Box textAlign="center" py={3}>
// //         <Box position="relative" display="inline-block">
// //           <Avatar sx={{ width: 90, height: 90 }} />
// //           <IconButton
// //             onClick={() => alert("Upload avatar")}
// //             sx={{
// //               position: "absolute",
// //               bottom: 0,
// //               right: 0,
// //               bgcolor: "#2ecc71",
// //               color: "#fff",
// //               "&:hover": { bgcolor: "#27ae60" },
// //             }}
// //           >
// //             <EditIcon fontSize="small" />
// //           </IconButton>
// //         </Box>

// //         <Typography fontWeight={600} mt={2}>
// //           {user.name}
// //         </Typography>
// //         <Typography color="text.secondary">
// //           {user.username}
// //         </Typography>

// //         <Chip
// //           label="VERIFIED BUYER"
// //           sx={{
// //             mt: 1,
// //             backgroundColor: "#e8f7ef",
// //             color: "#2ecc71",
// //             fontWeight: 600,
// //           }}
// //         />
// //       </Box>

// //       {/* PERSONAL INFO */}
// //       <Typography px={2} fontWeight={600} mb={1}>
// //         Personal Info
// //       </Typography>

// //       <Paper sx={{ mx: 2, mb: 2, borderRadius: 2 }}>
// //         <Box p={2} onClick={() => setEditOpen(true)} sx={{ cursor: "pointer" }}>
// //           <Typography fontWeight={500}>Email</Typography>
// //           <Typography color="text.secondary">{user.email}</Typography>
// //         </Box>
// //         <Divider />
// //         <Box p={2} onClick={() => setEditOpen(true)} sx={{ cursor: "pointer" }}>
// //           <Typography fontWeight={500}>Phone</Typography>
// //           <Typography color="text.secondary">{user.phone}</Typography>
// //         </Box>
// //       </Paper>

// //       {/* SHIPPING */}
// //       <Typography px={2} fontWeight={600} mb={1}>
// //         Shipping
// //       </Typography>

// //       <Paper
// //         sx={{ mx: 2, mb: 2, borderRadius: 2, cursor: "pointer" }}
// //         onClick={() => setEditOpen(true)}
// //       >
// //         <Box p={2}>
// //           <Typography fontWeight={500}>Primary Address</Typography>
// //           <Typography color="text.secondary">{user.address}</Typography>
// //         </Box>
// //       </Paper>

// //       {/* RECENT ORDERS */}
// //       <Box px={2} display="flex" justifyContent="space-between">
// //         <Typography fontWeight={600}>Recent Orders</Typography>
// //         <Typography
// //           color="#2ecc71"
// //           fontWeight={600}
// //           sx={{ cursor: "pointer" }}
// //           onClick={() => alert("View all orders")}
// //         >
// //           View All
// //         </Typography>
// //       </Box>

// //       {orders.map(order => {
// //         const style = statusStyle(order.status);
// //         return (
// //           <Paper
// //             key={order.id}
// //             sx={{
// //               mx: 2,
// //               my: 2,
// //               p: 2,
// //               borderRadius: 2,
// //               cursor: "pointer",
// //               transition: "0.25s",
// //               "&:hover": {
// //                 transform: "translateY(-4px)",
// //                 boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
// //               },
// //             }}
// //             onClick={() => alert(`Order: ${order.product}`)}
// //           >
// //             <Box display="flex" justifyContent="space-between">
// //               <Box>
// //                 <Typography fontWeight={600}>{order.product}</Typography>
// //                 <Typography fontSize={13} color="text.secondary">
// //                   Size: {order.size} • {order.date}
// //                 </Typography>
// //                 <Chip
// //                   label={order.status}
// //                   size="small"
// //                   sx={{
// //                     mt: 1,
// //                     backgroundColor: style.bg,
// //                     color: style.color,
// //                     fontWeight: 600,
// //                   }}
// //                 />
// //               </Box>
// //               <Typography fontWeight={700}>${order.price}</Typography>
// //             </Box>
// //           </Paper>
// //         );
// //       })}

// //       {/* LOGOUT */}
// //       <Box textAlign="center" py={3}>
// //         <Typography
// //           color="error"
// //           fontWeight={600}
// //           sx={{ cursor: "pointer" }}
// //           onClick={() => setLogoutOpen(true)}
// //         >
// //           <LogoutIcon fontSize="small" /> Log Out
// //         </Typography>
// //       </Box>

// //       {/* EDIT DIALOG */}
// //       <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
// //         <DialogTitle>Edit Profile</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             fullWidth
// //             label="Name"
// //             margin="dense"
// //             value={tempUser.name}
// //             onChange={e =>
// //               setTempUser({ ...tempUser, name: e.target.value })
// //             }
// //           />
// //           <TextField
// //             fullWidth
// //             label="Email"
// //             margin="dense"
// //             value={tempUser.email}
// //             onChange={e =>
// //               setTempUser({ ...tempUser, email: e.target.value })
// //             }
// //           />
// //           <TextField
// //             fullWidth
// //             label="Phone"
// //             margin="dense"
// //             value={tempUser.phone}
// //             onChange={e =>
// //               setTempUser({ ...tempUser, phone: e.target.value })
// //             }
// //           />
// //           <TextField
// //             fullWidth
// //             label="Address"
// //             margin="dense"
// //             value={tempUser.address}
// //             onChange={e =>
// //               setTempUser({ ...tempUser, address: e.target.value })
// //             }
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setEditOpen(false)}>Cancel</Button>
// //           <Button variant="contained" onClick={handleSave}>
// //             Save
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* LOGOUT CONFIRM */}
// //       <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)}>
// //         <DialogTitle>Confirm Logout</DialogTitle>
// //         <DialogActions>
// //           <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
// //           <Button color="error" onClick={() => alert("Logged out")}>
// //             Logout
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default buyerProfile;

// import { Paper, Box, Typography, Chip } from "@mui/material";

// const statusStyle = (status) => {
//   if (status === "DELIVERED") return { bg: "#e8f7ef", color: "#2ecc71" };
//   if (status === "SHIPPED") return { bg: "#e8f4fd", color: "#3498db" };
//   return { bg: "#fff4e5", color: "#f39c12" };
// };

// const buyerOrders = ({ orders }) => {
//   return (
//     <Box>
//       {orders.map((order) => {
//         const style = statusStyle(order.status);
//         return (
//           <Paper
//             key={order.id}
//             sx={{
//               my: 1,
//               p: 2,
//               borderRadius: 2,
//               cursor: "pointer",
//               transition: "0.25s",
//               "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 30px rgba(0,0,0,0.12)" },
//             }}
//             onClick={() => alert(`Order: ${order.product}`)}
//           >
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography fontWeight={600}>{order.product}</Typography>
//                 <Typography fontSize={13} color="text.secondary">
//                   Size: {order.size} • {order.date}
//                 </Typography>
//                 <Chip
//                   label={order.status}
//                   size="small"
//                   sx={{ mt: 1, backgroundColor: style.bg, color: style.color, fontWeight: 600 }}
//                 />
//               </Box>
//               <Typography fontWeight={700}>${order.price}</Typography>
//             </Box>
//           </Paper>
//         );
//       })}
//     </Box>
//   );
// };

// export default buyerOrders;

