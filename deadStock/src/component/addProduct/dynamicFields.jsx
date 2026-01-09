import { Box, TextField, Button, Stack } from "@mui/material";
import { Plus, Trash } from "lucide-react";

const DynamicFields = ({ fields, setFields }) => {
  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  const updateField = (index, type, value) => {
    const updated = [...fields];
    updated[index][type] = value;
    setFields(updated);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Stack key={index} direction="row" spacing={2}>
            <TextField
              label="Field Name"
              value={field.key}
              onChange={(e) =>
                updateField(index, "key", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Value"
              value={field.value}
              onChange={(e) =>
                updateField(index, "value", e.target.value)
              }
              fullWidth
            />
            <Button
              color="error"
              onClick={() => removeField(index)}
            >
              <Trash size={18} />
            </Button>
          </Stack>
        ))}

        <Button
          startIcon={<Plus />}
          variant="outlined"
          onClick={addField}
        >
          Add Custom Field
        </Button>
      </Stack>
    </Box>
  );
};

export default DynamicFields;
