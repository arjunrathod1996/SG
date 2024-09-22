import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Checkbox, FormControlLabel, MenuItem, Select } from '@mui/material';

// Example options for dropdowns
const columnOptions = {
    policyId: ['POLICY_1', 'POLICY_2', 'POLICY_3'],
    domainRisk: ['Low', 'Medium', 'High'],
    documentName: ['Document 1', 'Document 2', 'Document 3'],
    // Add other options as needed
};

export const ColumnFilterDialog = ({ open, onClose, onApply }) => {
    const [filters, setFilters] = useState({
        policyId: [],
        domainRisk: [],
        documentName: [],
        // Initialize other filters as needed
    });

    const handleFilterChange = (columnId, value) => {
        setFilters(prev => ({
            ...prev,
            [columnId]: value,
        }));
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filter Columns</DialogTitle>
            <DialogContent>
                {Object.keys(columnOptions).map(columnId => (
                    <div key={columnId}>
                        <DialogTitle>{columnId.replace(/([A-Z])/g, ' $1')}</DialogTitle>
                        <Select
                            multiple
                            value={filters[columnId]}
                            onChange={(e) => handleFilterChange(columnId, e.target.value)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {columnOptions[columnId].map(option => (
                                <MenuItem key={option} value={option}>
                                    <Checkbox checked={filters[columnId].includes(option)} />
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleApply}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
};
