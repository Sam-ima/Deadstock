import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./SearchContext";
import { useCategories } from "../../context/categoryContext";

const SearchBar = ({ placeholder = "Search..." }) => {
  const { query, setQuery } = useSearch();
  const { categories } = useCategories();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const q = query.trim().toLowerCase();
    if (!q) return;

    // find matching category
    const matchedCategory = categories.find(
      (cat) =>
        cat.name.toLowerCase() === q ||
        cat.slug.toLowerCase() === q
    );

    if (matchedCategory) {
      navigate(`/category/${matchedCategory.slug}`);
      setQuery(""); // optional but UX-friendly
    }
  };

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      variant="outlined"
      sx={{
        maxWidth: { xs: "100%", sm: 400 },
        "& .MuiOutlinedInput-root": {
          borderRadius: "25px",
          backgroundColor: "background.paper",
          transition: "0.2s ease-in-out",
          "&:hover": { boxShadow: 3 },
          "&.Mui-focused": { boxShadow: 4 },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
