// components/checkout/steps/constants/ShippingFields.js - Updated with better organization
export const SHIPPING_FIELDS = [
  {
    id: "fullName",
    label: "Full name",
    placeholder: "",
    icon: "👤",
    fullWidth: true,
    required: true,
    autoComplete: "name",
    category: "personal"
  },
  {
    id: "email",
    label: "Email",
    placeholder: "",
    icon: "📧",
    fullWidth: true,
    required: true,
    type: "email",
    autoComplete: "email",
    category: "contact"
  },
  {
    id: "address",
    label: "Street address",
    placeholder: "123 Main Street",
    icon: "🏠",
    fullWidth: true,
    required: true,
    autoComplete: "street-address",
    category: "location"
  },
  {
    id: "city",
    label: "City",
    placeholder: "",
    icon: "🏙️",
    fullWidth: true,
    required: true,
    autoComplete: "address-level2",
    category: "location"
  },
  {
    id: "zip",
    label: "Postal / ZIP code",
    placeholder: "",
    icon: "📮",
    fullWidth: true,
    required: true,
    autoComplete: "postal-code",
    category: "location",
    pattern: "[0-9]*"
  },
  {
    id: "state",
    label: "State / Province",
    placeholder: "",
    icon: "🗺️",
    fullWidth: true,
    required: true,
    autoComplete: "address-level1",
    category: "location"
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "",
    icon: "📞",
    fullWidth: true,
    required: true,
    type: "tel",
    autoComplete: "tel",
    category: "contact"
  },
];

// Helper function to get fields by category
export const getFieldsByCategory = (category) => {
  return SHIPPING_FIELDS.filter(field => field.category === category);
};

// Helper function to get fields for specific layouts
export const getFieldsForLayout = (layout) => {
  switch (layout) {
    case 'twoColumn':
      return ['city', 'zip', 'state', 'phone'];
    case 'fullWidth':
      return ['fullName', 'email', 'address'];
    default:
      return SHIPPING_FIELDS.map(f => f.id);
  }
};