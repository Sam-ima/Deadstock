// import {
//     Box,
//     TextField,
//     InputAdornment,
//     Chip,
//     Button
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';

// const CategoriesSearchBar = ({
//     searchQuery,
//     setSearchQuery,
//     clearFilters
// }) => {
//     return (
//         <Box
//             display="flex"
//             flexDirection={{ xs: 'column', md: 'row' }}
//             backgroundColor="#c73434ff"
//             gap={2}
//             mb={4}
//         >
//             <TextField
//                 fullWidth
//                 placeholder="Search categories..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//             />

//             <Box display="flex" gap={1}>
//                 <Chip icon={<FilterListIcon />} label="Filters" variant="outlined" />
//                 <Button onClick={clearFilters} color="error">
//                     Clear
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default CategoriesSearchBar;
