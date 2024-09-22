import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface CustomTypeaheadFilterProps {
    filterList: string[];
    onFilterChange: (changedColumn: string, filterList: string[]) => void;
    column: any;
}

const CustomTypeaheadFilter: React.FC<CustomTypeaheadFilterProps> = ({ filterList, onFilterChange, column }) => {
    const allOptions = [...new Set(hardCodedData.map(row => row[column.name]))];

    return (
        <Autocomplete
            multiple
            options={allOptions}
            getOptionLabel={(option) => option}
            value={filterList}
            onChange={(event, newValue) => {
                onFilterChange(column.name, newValue);
            }}
            renderInput={(params) => <TextField {...params} label={column.label} variant="outlined" />}
        />
    );
};

export default CustomTypeaheadFilter;
