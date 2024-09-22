

// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import MUIDataTable from 'mui-datatables';
// import { Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, Select, Checkbox } from '@mui/material';
// import { Button } from 'reactstrap';
// import queryString from 'query-string';
// import { CustomCloudDownloadIcon, CustomFilterListIcon, CustomViewColumnIcon } from '../../../../components/customIcons/CustomeIcons';

// // Example data
// const hardCodedData = Array.from({ length: 20 }, (_, index) => ({
//     policyId: `POLICY_${index + 1}`,
//     domainRisk: 'Low',
//     documentName: `Document ${index + 1}`,
//     sgCodeReference: `SG_${index + 1}`,
//     policyPublicationDate: `2024-01-${(index % 30) + 1}`,
//     documentType: 'Type A',
//     busu: `Unit ${index + 1}`,
//     implementationDeadlineDate: `2024-12-${(index % 30) + 1}`,
//     dispensationDeadlineDate: `2024-12-${(index % 30) + 1}`,
//     mypnpStatus: 'Pending',
// }));

// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
//     <div style={{ display: 'flex', gap: '8px' }}>
//         <Tooltip title="Filter" arrow>
//             <CustomFilterListIcon onClick={handleFilter} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="View Columns" arrow>
//             <CustomViewColumnIcon onClick={handleViewColumns} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="Download" arrow>
//             <CustomCloudDownloadIcon onClick={handleDownload} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//     </div>
// );

// const ColumnFilterDialog = ({ open, onClose, onApply }) => {
//     const [filters, setFilters] = useState({
//         policyId: [],
//         domainRisk: [],
//         documentName: [],
//     });

//     useEffect(() => {
//         // Set filters from URL
//         const params = queryString.parse(window.location.search);

//         const getValues = (param) => {
//             if (Array.isArray(param)) {
//                 return param.flat().filter(Boolean);
//             }
//             return param ? param.split(',') : [];
//         };

//         setFilters({
//             policyId: getValues(params.policyId),
//             domainRisk: getValues(params.domainRisk),
//             documentName: getValues(params.documentName),
//         });
//     }, [open]);

//     const handleFilterChange = (columnId, value) => {
//         setFilters(prev => ({
//             ...prev,
//             [columnId]: value,
//         }));
//     };

//     const handleApply = () => {
//         onApply(filters);
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogTitle>Filter Columns</DialogTitle>
//             <DialogContent>
//                 {Object.keys(filters).map(columnId => (
//                     <div key={columnId}>
//                         <DialogTitle>{columnId.replace(/([A-Z])/g, ' $1')}</DialogTitle>
//                         <Select
//                             multiple
//                             value={filters[columnId]}
//                             onChange={(e) => handleFilterChange(columnId, e.target.value)}
//                             renderValue={(selected) => selected.join(', ')}
//                         >
//                             {/* Add your options here */}
//                             {['Option 1', 'Option 2'].map(option => (
//                                 <MenuItem key={option} value={option}>
//                                     <Checkbox checked={filters[columnId].includes(option)} />
//                                     {option}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </div>
//                 ))}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button onClick={handleApply}>Apply</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// const ColumnSelectionDialog = ({ open, onClose, columns, onApply }) => {
//     const [selectedColumns, setSelectedColumns] = useState(columns);

//     useEffect(() => {
//         // Set column visibility from URL
//         const params = queryString.parse(window.location.search);

//         const getVisibleColumns = (param) => {
//             if (Array.isArray(param)) {
//                 return param.flat().filter(Boolean);
//             }
//             return param ? param.split(',') : [];
//         };

//         setSelectedColumns(prev =>
//             prev.map(col => ({
//                 ...col,
//                 visible: getVisibleColumns(params.columns).includes(col.id),
//             }))
//         );
//     }, [open]);

//     const handleToggleColumn = (columnId) => {
//         setSelectedColumns(prev =>
//             prev.map(col =>
//                 col.id === columnId ? { ...col, visible: !col.visible } : col
//             )
//         );
//     };

//     const handleApply = () => {
//         onApply(selectedColumns.filter(col => col.visible).map(col => col.id));
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogTitle>Choose Columns</DialogTitle>
//             <DialogContent>
//                 {selectedColumns.map((col) => (
//                     <FormControlLabel
//                         key={col.id}
//                         control={<Checkbox checked={col.visible} onChange={() => handleToggleColumn(col.id)} />}
//                         label={col.name}
//                     />
//                 ))}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button onClick={handleApply}>Apply</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// const DocumentViewPending = () => {
//     const [filterDialogOpen, setFilterDialogOpen] = useState(false);
//     const [columnDialogOpen, setColumnDialogOpen] = useState(false);
//     const [columnFilters, setColumnFilters] = useState({
//         policyId: [],
//         domainRisk: [],
//         documentName: [],
//     });
//     const [selectedColumns, setSelectedColumns] = useState([
//         { id: 'policyId', name: 'Policy ID', visible: true },
//         { id: 'domainRisk', name: 'Domain Risk', visible: true },
//         { id: 'documentName', name: 'Document Name', visible: true },
//         // Add other columns as needed
//     ]);
//     const [filteredData, setFilteredData] = useState(hardCodedData);

//     // Update URL based on filters and columns
//     const updateURL = () => {
//         const params = {
//             policyId: columnFilters.policyId.join(','),
//             domainRisk: columnFilters.domainRisk.join(','),
//             documentName: columnFilters.documentName.join(','),
//             columns: selectedColumns.filter(col => col.visible).map(col => col.id).join(','),
//         };
//         const queryStringified = queryString.stringify(params);
//         window.history.replaceState(null, '', `?${queryStringified}`);
//     };

//     useEffect(() => {
//         updateURL();
//     }, [columnFilters, selectedColumns]);

//     // Memoize the columns to avoid unnecessary re-renders
//     const columns = useMemo(() =>
//         selectedColumns
//             .filter(col => col.visible)
//             .map(col => ({
//                 name: col.id,
//                 label: col.name
//             })),
//         [selectedColumns]
//     );

//     // Handle filter application
//     const applyFilters = (filters) => {
//         const filtered = hardCodedData.filter(item =>
//             Object.keys(filters).every(columnId =>
//                 filters[columnId].length === 0 || filters[columnId].includes(item[columnId])
//             )
//         );
//         setFilteredData(filtered);
//         setColumnFilters(filters);
//     };

//     const handleFilter = () => setFilterDialogOpen(true);
//     const handleViewColumns = () => setColumnDialogOpen(true);
//     const handleDownload = () => {
//         console.log('Download icon clicked');
//         const csvContent = [
//             ['Policy ID', 'Domain Risk', 'Document Name'],
//             ...filteredData.map(item => [
//                 item.policyId,
//                 item.domainRisk,
//                 item.documentName,
//             ]),
//         ]
//             .map(e => e.join(','))
//             .join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         if (link.download !== undefined) {
//             const url = URL.createObjectURL(blob);
//             link.setAttribute('href', url);
//             link.setAttribute('download', 'MyPendingDocumentViewList.csv');
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     };

//     return (
//         <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: "70px" }}>
//             <ColumnFilterDialog
//                 open={filterDialogOpen}
//                 onClose={() => setFilterDialogOpen(false)}
//                 onApply={applyFilters}
//             />
//             <ColumnSelectionDialog
//                 open={columnDialogOpen}
//                 onClose={() => setColumnDialogOpen(false)}
//                 columns={selectedColumns}
//                 onApply={(visibleColumns) => {
//                     setSelectedColumns(prev =>
//                         prev.map(col =>
//                             visibleColumns.includes(col.id) ? { ...col, visible: true } : { ...col, visible: false }
//                         )
//                     );
//                 }}
//             />
//             <MUIDataTable
//                 title={'Pending Documents'}
//                 columns={columns}
//                 data={filteredData}
//                 options={{
//                     filterType: 'multiselect',
//                     fixedHeader: true,
//                     responsive: 'standard',
//                     customToolbar: () => (
//                         <CustomToolbar
//                             handleFilter={handleFilter}
//                             handleViewColumns={handleViewColumns}
//                             handleDownload={handleDownload}
//                         />
//                     ),
//                 }}
//             />
//         </div>
//     );
// };

// export default DocumentViewPending;







// import React, { useEffect, useState, useMemo } from 'react';
// import MUIDataTable from 'mui-datatables';
// import {
//     Tooltip,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     FormControlLabel,
//     MenuItem,
//     Select,
//     Checkbox,
//     Typography,
// } from '@mui/material';
// import { Button } from 'reactstrap';
// import queryString from 'query-string';
// import { CustomCloudDownloadIcon, CustomFilterListIcon, CustomViewColumnIcon } from '../../../../components/customIcons/CustomeIcons';

// import { styled } from '@mui/system';

// // Custom styled components
// const DialogTitleStyled = styled(DialogTitle)`
//     background-color: #f5f5f5;
//     color: #333;
//     font-weight: bold;
// `;

// const DialogContentStyled = styled(DialogContent)`
//     padding: 16px 24px;
// `;



// // Sample data
// const hardCodedData = Array.from({ length: 20 }, (_, index) => ({
//     policyId: `POLICY_${index + 1}`,
//     domainRisk: 'Low',
//     documentName: `Document ${index + 1}`,
//     sgCodeReference: `SG_${index + 1}`,
//     policyPublicationDate: `2024-01-${(index % 30) + 1}`,
//     documentType: 'Type A',
//     busu: `Unit ${index + 1}`,
//     implementationDeadlineDate: `2024-12-${(index % 30) + 1}`,
//     dispensationDeadlineDate: `2024-12-${(index % 30) + 1}`,
//     mypnpStatus: 'Pending',
// }));

// // Custom toolbar component
// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
//     <div className="flex gap-2 p-2">
//         <Tooltip title="Filter" arrow>
//             <div className="action-icon hover:text-blue-500 cursor-pointer" onClick={handleFilter}>
//                 <CustomFilterListIcon />
//             </div>
//         </Tooltip>
//         <Tooltip title="View Columns" arrow>
//             <div className="action-icon hover:text-green-500 cursor-pointer" onClick={handleViewColumns}>
//                 <CustomViewColumnIcon />
//             </div>
//         </Tooltip>
//         <Tooltip title="Download" arrow>
//             <div className="action-icon hover:text-red-500 cursor-pointer" onClick={handleDownload}>
//                 <CustomCloudDownloadIcon />
//             </div>
//         </Tooltip>
//     </div>
// );

// // Column filter dialog component
// const ColumnFilterDialog = ({ open, onClose, onApply }) => {
//     const [filters, setFilters] = useState({
//         policyId: [],
//         domainRisk: [],
//         documentName: [],
//     });

//     useEffect(() => {
//         const params = queryString.parse(window.location.search);
//         const getValues = (param) => (Array.isArray(param) ? param : param ? param.split(',') : []);
//         setFilters({
//             policyId: getValues(params.policyId),
//             domainRisk: getValues(params.domainRisk),
//             documentName: getValues(params.documentName),
//         });
//     }, [open]);

//     const handleFilterChange = (columnId, value) => {
//         setFilters((prev) => ({ ...prev, [columnId]: value }));
//     };

//     const handleApply = () => {
//         onApply(filters);
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//             <DialogTitle>Filter Columns</DialogTitle>
//             <DialogContent>
//                 {Object.keys(filters).map((columnId) => (
//                     <div key={columnId} className="mb-4">
//                         <DialogTitle>{columnId.replace(/([A-Z])/g, ' $1')}</DialogTitle>
//                         <Select
//                             multiple
//                             value={filters[columnId]}
//                             onChange={(e) => handleFilterChange(columnId, e.target.value)}
//                             renderValue={(selected) => selected.join(', ')}
//                             fullWidth
//                         >
//                             {['Option 1', 'Option 2'].map((option) => (
//                                 <MenuItem key={option} value={option}>
//                                     <Checkbox checked={filters[columnId].includes(option)} />
//                                     {option}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </div>
//                 ))}
//             </DialogContent>
//             <DialogActions className="p-4 flex justify-end space-x-2">
//     <Button
//         onClick={onClose}
//         className="bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 rounded-md px-4 py-2 font-semibold"
//     >
//         Cancel
//     </Button>
//     <Button
//         onClick={handleApply}
//         className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-2 font-semibold"
//     >
//         Apply
//     </Button>
// </DialogActions>

//         </Dialog>
//     );
// };

// // Column dialog component for visibility control
// // Column dialog component for visibility control
// const ColumnDialog = ({ open, onClose, columns, setSelectedColumns }) => {
//     const handleToggleColumn = (columnId) => {
//         setSelectedColumns((prevColumns) =>
//             prevColumns.map((col) =>
//                 col.id === columnId ? { ...col, visible: !col.visible } : col
//             )
//         );
//     };

//     const handleApply = () => {
//         const updatedColumns = columns.map((col) => ({
//             ...col,
//             visible: col.visible
//         }));
//         setSelectedColumns(updatedColumns);
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitleStyled>Select Columns to Display</DialogTitleStyled>
//             <DialogContentStyled>
//                 <Typography variant="subtitle1" gutterBottom>
//                     Select which columns you want to display in the table.
//                 </Typography>
//                 {columns.map((col) => (
//                     <FormControlLabel
//                         key={col.id}
//                         control={
//                             <Checkbox
//                                 checked={col.visible}
//                                 onChange={() => handleToggleColumn(col.id)}
//                                 color="primary"
//                             />
//                         }
//                         label={col.name}
//                     />
//                 ))}
//             </DialogContentStyled>
//             <DialogActions className="p-2">
//     <Button
//         variant="outlined"
//         color="secondary"
//         onClick={onClose}
//         className="border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 rounded-md px-4 py-1 font-semibold"
//     >
//         Close
//     </Button>
//     {/* <Button
//         variant="contained"
//         color="primary"
//         onClick={handleApply}
//         className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-1 font-semibold"
//     >
//         Apply
//     </Button> */}
// </DialogActions>

//         </Dialog>
//     );
// };



// // Main component
// const DocumentViewPending = () => {
//     const [filterDialogOpen, setFilterDialogOpen] = useState(false);
//     const [columnDialogOpen, setColumnDialogOpen] = useState(false);
//     const [columnFilters, setColumnFilters] = useState({
//         policyId: [],
//         domainRisk: [],
//         documentName: [],
//     });
//     const [selectedColumns, setSelectedColumns] = useState([
//         { id: 'policyId', name: 'Policy ID', visible: true },
//         { id: 'domainRisk', name: 'Domain Risk', visible: true },
//         { id: 'documentName', name: 'Document Name', visible: true },
//     ]);
//     const [filteredData, setFilteredData] = useState(hardCodedData);

//     const updateURL = () => {
//         const params = {
//             policyId: columnFilters.policyId.join(','),
//             domainRisk: columnFilters.domainRisk.join(','),
//             documentName: columnFilters.documentName.join(','),
//             columns: selectedColumns.filter((col) => col.visible).map((col) => col.id).join(','),
//         };
//         window.history.replaceState(null, '', `?${queryString.stringify(params)}`);
//     };

//     useEffect(() => {
//         updateURL();
//     }, [columnFilters, selectedColumns]);

//     const columns = useMemo(
//         () =>
//             selectedColumns
//                 .filter((col) => col.visible)
//                 .map((col) => ({
//                     name: col.id,
//                     label: col.name,
//                 })),
//         [selectedColumns]
//     );

//     const applyFilters = (filters) => {
//         const filtered = hardCodedData.filter((item) =>
//             Object.keys(filters).every(
//                 (columnId) => filters[columnId].length === 0 || filters[columnId].includes(item[columnId])
//             )
//         );
//         setFilteredData(filtered);
//         setColumnFilters(filters);
//     };

//     const handleFilter = () => setFilterDialogOpen(true);
//     const handleViewColumns = () => setColumnDialogOpen(true);
//     const handleDownload = () => {
//         const csvContent = [
//             ['Policy ID', 'Domain Risk', 'Document Name'],
//             ...filteredData.map((item) => [item.policyId, item.domainRisk, item.documentName]),
//         ]
//             .map((e) => e.join(','))
//             .join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', 'PendingDocuments.csv');
//         link.click();
//     };

//     return (
//         <div className="p-3 lg:ml-64 z-10 static " style={{marginTop:"70px"}}>
//             <ColumnFilterDialog
//                 open={filterDialogOpen}
//                 onClose={() => setFilterDialogOpen(false)}
//                 onApply={applyFilters}
//             />
//             <ColumnDialog
//                 open={columnDialogOpen}
//                 onClose={() => setColumnDialogOpen(false)}
//                 columns={selectedColumns}
//                 setSelectedColumns={setSelectedColumns}
//             />
//             <h2 className="text-3xl mb-4 font-semibold text-blue-700">Pending Documents</h2>
//             <MUIDataTable
//                 title={<span className="text-blue-700 font-bold">Pending Documents</span>}
//                 columns={columns}
//                 data={filteredData}
//                 options={{
//                     filterType: 'multiselect',
//                     responsive: 'standard',
//                     customToolbar: () => (
//                         <CustomToolbar
//                             handleFilter={handleFilter}
//                             handleViewColumns={handleViewColumns}
//                             handleDownload={handleDownload}
//                         />
//                     ),
//                 }}
//             />
//         </div>
//     );
// };

// export default DocumentViewPending;


// import React, { useEffect, useState, useMemo } from 'react';
// import MUIDataTable from 'mui-datatables';
// import {
//     Tooltip,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     FormControlLabel,
//     MenuItem,
//     Select,
//     Checkbox,
//     Typography,
//     Chip,
//     Box
// } from '@mui/material';
// import { Button } from 'reactstrap';
// import queryString from 'query-string';
// import { CustomCloudDownloadIcon, CustomFilterListIcon, CustomViewColumnIcon } from '../../../../components/customIcons/CustomeIcons';

// import { styled } from '@mui/system';

// // Custom styled components
// const DialogTitleStyled = styled(DialogTitle)`
//     background-color: #f5f5f5;
//     color: #333;
//     font-weight: bold;
// `;

// const DialogContentStyled = styled(DialogContent)`
//     padding: 16px 24px;
// `;

// // Sample data
// const hardCodedData = Array.from({ length: 20 }, (_, index) => ({
//     policyId: `POLICY_${index + 1}`,
//     domainRisk: 'Low',
//     documentName: `Document ${index + 1}`,
//     sgCodeReference: `SG_${index + 1}`,
//     policyPublicationDate: `2024-01-${(index % 30) + 1}`,
//     documentType: 'Type A',
//     busu: `Unit ${index + 1}`,
//     implementationDeadlineDate: `2024-12-${(index % 30) + 1}`,
//     dispensationDeadlineDate: `2024-12-${(index % 30) + 1}`,
//     mypnpStatus: 'Pending',
// }));

// // Custom toolbar component
// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
//     <div className="flex gap-2 p-2">
//         <Tooltip title="Filter" arrow>
//             <div className="action-icon hover:text-blue-500 cursor-pointer" onClick={handleFilter}>
//                 <CustomFilterListIcon />
//             </div>
//         </Tooltip>
//         <Tooltip title="View Columns" arrow>
//             <div className="action-icon hover:text-green-500 cursor-pointer" onClick={handleViewColumns}>
//                 <CustomViewColumnIcon />
//             </div>
//         </Tooltip>
//         <Tooltip title="Download" arrow>
//             <div className="action-icon hover:text-red-500 cursor-pointer" onClick={handleDownload}>
//                 <CustomCloudDownloadIcon />
//             </div>
//         </Tooltip>
//     </div>
// );

// // Column filter dialog component
// const ColumnFilterDialog = ({ open, onClose, onApply, filters, setFilters }) => {

//     // Handler to remove a tag
//     const handleDelete = (columnId, valueToDelete) => {
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             [columnId]: prevFilters[columnId].filter(value => value !== valueToDelete)
//         }));
//     };

//     // Handler for selecting new items
//     const handleFilterChange = (columnId, newValue) => {
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             [columnId]: newValue
//         }));
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//             <DialogTitle>Filter Columns</DialogTitle>
//             <DialogContent>
//                 {Object.keys(filters).map((columnId) => (
//                     <div key={columnId} className="mb-4">
//                         <DialogTitle>{columnId.replace(/([A-Z])/g, ' $1')}</DialogTitle>
//                         <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
//                             {filters[columnId].map((tag) => (
//                                 <Chip
//                                     key={tag}
//                                     label={tag}
//                                     onDelete={() => handleDelete(columnId, tag)}
//                                     style={{ margin: '2px' }}
//                                 />
//                             ))}
//                         </Box>
//                         <Select
//                             multiple
//                             value={filters[columnId]}
//                             onChange={(e) => handleFilterChange(columnId, e.target.value)}
//                             renderValue={(selected) => selected.join(', ')}
//                             fullWidth
//                         >
//                             {['Option 1', 'Option 2'].map((option) => (
//                                 <MenuItem key={option} value={option}>
//                                     <Checkbox checked={filters[columnId].includes(option)} />
//                                     {option}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </div>
//                 ))}
//             </DialogContent>
//             <DialogActions>
//                 <Button
//                     onClick={onClose}
//                     className="bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 rounded-md px-4 py-2 font-semibold"
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     onClick={() => onApply(filters)}
//                     className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-2 font-semibold"
//                 >
//                     Apply
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// // Column dialog component for visibility control
// const ColumnDialog = ({ open, onClose, columns, setSelectedColumns }) => {
//     const handleToggleColumn = (columnId) => {
//         setSelectedColumns((prevColumns) =>
//             prevColumns.map((col) =>
//                 col.id === columnId ? { ...col, visible: !col.visible } : col
//             )
//         );
//     };

//     const handleApply = () => {
//         const updatedColumns = columns.map((col) => ({
//             ...col,
//             visible: col.visible
//         }));
//         setSelectedColumns(updatedColumns);
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//             <DialogTitleStyled>Select Columns to Display</DialogTitleStyled>
//             <DialogContentStyled>
//                 <Typography variant="subtitle1" gutterBottom>
//                     Select which columns you want to display in the table.
//                 </Typography>
//                 {columns.map((col) => (
//                     <FormControlLabel
//                         key={col.id}
//                         control={
//                             <Checkbox
//                                 checked={col.visible}
//                                 onChange={() => handleToggleColumn(col.id)}
//                                 color="primary"
//                             />
//                         }
//                         label={col.name}
//                     />
//                 ))}
//             </DialogContentStyled>
//             <DialogActions className="p-2">
//                 <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={onClose}
//                     className="border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 rounded-md px-4 py-1 font-semibold"
//                 >
//                     Close
//                 </Button>
//                 {/* <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleApply}
//                     className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-1 font-semibold"
//                 >
//                     Apply
//                 </Button> */}
//             </DialogActions>
//         </Dialog>
//     );
// };

// // Main component
// const DocumentViewPending = () => {
//     const [filterDialogOpen, setFilterDialogOpen] = useState(false);
//     const [columnDialogOpen, setColumnDialogOpen] = useState(false);
//     const [columnFilters, setColumnFilters] = useState({
//         policyId: [],
//         domainRisk: [],
//         documentName: [],
//     });
//     const [selectedColumns, setSelectedColumns] = useState([
//         { id: 'policyId', name: 'Policy ID', visible: true },
//         { id: 'domainRisk', name: 'Domain Risk', visible: true },
//         { id: 'documentName', name: 'Document Name', visible: true },
//     ]);
//     const [filteredData, setFilteredData] = useState(hardCodedData);
//     const [selectedTags, setSelectedTags] = useState([]);

//     const updateURL = () => {
//         const params = {
//             policyId: columnFilters.policyId.join(','),
//             domainRisk: columnFilters.domainRisk.join(','),
//             documentName: columnFilters.documentName.join(','),
//             columns: selectedColumns.filter((col) => col.visible).map((col) => col.id).join(','),
//         };
//         window.history.replaceState(null, '', `?${queryString.stringify(params)}`);
//     };

//     useEffect(() => {
//         updateURL();
//     }, [columnFilters, selectedColumns]);

//     const columns = useMemo(
//         () =>
//             selectedColumns
//                 .filter((col) => col.visible)
//                 .map((col) => ({
//                     name: col.id,
//                     label: col.name,
//                 })),
//         [selectedColumns]
//     );

//     const applyFilters = (filters) => {
//         const filtered = hardCodedData.filter((item) =>
//             Object.keys(filters).every(
//                 (columnId) => filters[columnId].length === 0 || filters[columnId].includes(item[columnId])
//             )
//         );
//         setFilteredData(filtered);
//         setColumnFilters(filters);
//     };

//     return (
//         <>
//             <div className="p-3 lg:ml-64 z-10 static " style={{marginTop:"70px"}}>

//             <MUIDataTable
//                 title={'Document View Pending'}
//                 data={filteredData}
//                 columns={columns}
//                 options={{
//                     filterType: 'checkbox',
//                     customToolbar: () => (
//                         <CustomToolbar
//                             handleFilter={() => setFilterDialogOpen(true)}
//                             handleViewColumns={() => setColumnDialogOpen(true)}
//                             handleDownload={() => alert('Download clicked')}
//                         />
//                     ),
//                     responsive: 'standard',
//                 }}
//             />
//             <ColumnFilterDialog
//     open={filterDialogOpen}
//     onClose={() => setFilterDialogOpen(false)}
//     onApply={applyFilters}
//     filters={columnFilters}
//     setFilters={setColumnFilters}
// />

//             <ColumnDialog
//                 open={columnDialogOpen}
//                 onClose={() => setColumnDialogOpen(false)}
//                 columns={selectedColumns}
//                 setSelectedColumns={setSelectedColumns}
//             />
//             {/* <Box mt={2}>
//                 <Typography variant="h6">Selected Tags:</Typography>
//                 <Box mt={1}>
//                     {selectedTags.map((tag, index) => (
//                         <Chip
//                             key={index}
//                             label={tag}
//                             onDelete={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
//                             style={{ margin: '2px' }}
//                         />
//                     ))}
//                 </Box>
//             </Box> */}

//             </div>
//         </>
//     );
// };

// export default DocumentViewPending;



import React, { useEffect, useState, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import {
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Select,
    Checkbox,
    Typography,
    Chip,
    Box
} from '@mui/material';
import { Button } from 'reactstrap';
import queryString from 'query-string';
import { CustomCloudDownloadIcon, CustomFilterListIcon, CustomViewColumnIcon } from '../../../../components/customIcons/CustomeIcons';

import { styled } from '@mui/system';

// Custom styled components
const DialogTitleStyled = styled(DialogTitle)`
    background-color: #f5f5f5;
    color: #333;
    font-weight: bold;
`;

const DialogContentStyled = styled(DialogContent)`
    padding: 16px 24px;
`;

// Sample data
const hardCodedData = Array.from({ length: 20 }, (_, index) => ({
    policyId: `POLICY_${index + 1}`,
    domainRisk: 'Low',
    documentName: `Document ${index + 1}`,
    sgCodeReference: `SG_${index + 1}`,
    policyPublicationDate: `2024-01-${(index % 30) + 1}`,
    documentType: 'Type A',
    busu: `Unit ${index + 1}`,
    implementationDeadlineDate: `2024-12-${(index % 30) + 1}`,
    dispensationDeadlineDate: `2024-12-${(index % 30) + 1}`,
    mypnpStatus: 'Pending',
}));

// Custom toolbar component
const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
    <div className="flex gap-2 p-2">
        <Tooltip title="Filter" arrow>
            <div className="action-icon hover:text-blue-500 cursor-pointer" onClick={handleFilter}>
                <CustomFilterListIcon />
            </div>
        </Tooltip>
        <Tooltip title="View Columns" arrow>
            <div className="action-icon hover:text-green-500 cursor-pointer" onClick={handleViewColumns}>
                <CustomViewColumnIcon />
            </div>
        </Tooltip>
        <Tooltip title="Download" arrow>
            <div className="action-icon hover:text-red-500 cursor-pointer" onClick={handleDownload}>
                <CustomCloudDownloadIcon />
            </div>
        </Tooltip>
    </div>
);

// Column filter dialog component
const ColumnFilterDialog = ({ open, onClose, onApply, filters, setFilters }) => {
    // Handler to remove a tag
    const handleDelete = (columnId, valueToDelete) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [columnId]: prevFilters[columnId].filter(value => value !== valueToDelete)
        }));
    };

    // Handler for selecting new items
    const handleFilterChange = (columnId, newValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [columnId]: newValue
        }));
    };

    const handleApply = () => {
        onApply(filters);
        onClose(); // Close the dialog after applying filters
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Filter Columns</DialogTitle>
            <DialogContent>
                {Object.keys(filters).map((columnId) => (
                    <div key={columnId} className="mb-4">
                        <DialogTitle>{columnId.replace(/([A-Z])/g, ' $1')}</DialogTitle>
                        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                            {filters[columnId].map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={() => handleDelete(columnId, tag)}
                                    style={{ margin: '2px' }}
                                />
                            ))}
                        </Box>
                        <Select
                            multiple
                            value={filters[columnId]}
                            onChange={(e) => handleFilterChange(columnId, e.target.value)}
                            renderValue={(selected) => selected.join(', ')}
                            fullWidth
                        >
                            {['Option 1', 'Option 2'].map((option) => (
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
                <Button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 rounded-md px-4 py-2 font-semibold"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleApply}
                    className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-2 font-semibold"
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// Column dialog component for visibility control
const ColumnDialog = ({ open, onClose, columns, setSelectedColumns }) => {
    // Local state to track column visibility changes
    const [localColumns, setLocalColumns] = useState(columns);

    const handleToggleColumn = (columnId) => {
        setLocalColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId ? { ...col, visible: !col.visible } : col
            )
        );
    };

    const handleApply = () => {
        // Apply visibility changes to the parent component
        setSelectedColumns(localColumns);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitleStyled>Select Columns to Display</DialogTitleStyled>
            <DialogContentStyled>
                <Typography variant="subtitle1" gutterBottom>
                    Select which columns you want to display in the table.
                </Typography>
                {localColumns.map((col) => (
                    <FormControlLabel
                        key={col.id}
                        control={
                            <Checkbox
                                checked={col.visible}
                                onChange={() => handleToggleColumn(col.id)}
                                color="primary"
                            />
                        }
                        label={col.name}
                    />
                ))}
            </DialogContentStyled>
            <DialogActions className="p-2">
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClose}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 rounded-md px-4 py-1 font-semibold"
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApply}
                    className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-1 font-semibold"
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};


// Main component
const DocumentViewPending = () => {
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [columnDialogOpen, setColumnDialogOpen] = useState(false);
    const [columnFilters, setColumnFilters] = useState({
        policyId: [],
        domainRisk: [],
        documentName: [],
    });
    const [selectedColumns, setSelectedColumns] = useState([
        { id: 'policyId', name: 'Policy ID', visible: true },
        { id: 'domainRisk', name: 'Domain Risk', visible: true },
        { id: 'documentName', name: 'Document Name', visible: true },
    ]);
    const [filteredData, setFilteredData] = useState(hardCodedData);

    const columns = useMemo(
        () =>
            selectedColumns
                .filter((col) => col.visible)
                .map((col) => ({
                    name: col.id,
                    label: col.name,
                })),
        [selectedColumns]
    );

    const applyFilters = (filters) => {
        const filtered = hardCodedData.filter((item) =>
            Object.keys(filters).every(
                (columnId) => filters[columnId].length === 0 || filters[columnId].includes(item[columnId])
            )
        );
        setFilteredData(filtered);
        setColumnFilters(filters);
    };

    return (
        <>
            <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: "70px" }}>
                <MUIDataTable
                    title={'Document View Pending'}
                    data={filteredData}
                    columns={columns}
                    options={{
                        filterType: 'checkbox',
                        customToolbar: () => (
                            <CustomToolbar
                                handleFilter={() => setFilterDialogOpen(true)}
                                handleViewColumns={() => setColumnDialogOpen(true)}
                                handleDownload={() => alert('Download clicked')}
                            />
                        ),
                        responsive: 'standard',
                    }}
                />
                <ColumnFilterDialog
                    open={filterDialogOpen}
                    onClose={() => setFilterDialogOpen(false)}
                    onApply={applyFilters}
                    filters={columnFilters}
                    setFilters={setColumnFilters}
                />
                <ColumnDialog
                    open={columnDialogOpen}
                    onClose={() => setColumnDialogOpen(false)}
                    columns={selectedColumns}
                    setSelectedColumns={setSelectedColumns}
                />
            </div>
        </>
    );
};

export default DocumentViewPending;




// src/components/DocumentViewPending.tsx

// import React from 'react';
// import Loader from '../../../../components/Loader/Loader';
// import DataTable from '../../../../components/DataTable';
// import { MUIDataTableOptions } from 'mui-datatables';
// import { CustomDownloadIcon,CustomFilterIcon } from '../../../../components/customIcons/CustomeIcons';

// const options: MUIDataTableOptions = {
// //   download: true,
// //   filter: true,
//   print: false,
//   searchable: false,
//   viewColumns: false,
//   search: false,
// //   customIcons: { 
// //     Download: <CustomDownloadIcon />,
// //     Filter: <CustomFilterIcon />,
// //     // Add other icons if needed
// //   },
//   // Other options if needed
// };

// const DocumentViewPending: React.FC = () => {
//   const documentLoading = false; // Set this to your actual loading state

//   return (
//     <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: '70px' }}>
//       <Loader type="LOADER" loading={documentLoading}>
//         <div className="Pandingactionb1">
//           <DataTable options={options} />
//         </div>
//       </Loader>
//     </div>
//   );
// };

// export default DocumentViewPending;


// import React from 'react';
// import Loader from '../../../../components/Loader/Loader';
// import DataTable from '../../../../components/DataTable';
// import { MUIDataTableOptions } from 'mui-datatables';
// import CustomDownloadButton from '../../../../components/customIcons/CustomDownloadButton';
// //import { CustomDownloadIcon } from '../../../../components/customIcons/CustomeIcons';


// const options: MUIDataTableOptions = {
//   download: true,  // Disable the default download button
//   filter: false,    // Disable the filter
//   customToolbar: () => (
//     <div>
//       <button
//         aria-label="Download data"
//         role="button"
//         onClick={() => console.log('Download clicked')} // Replace with your actual download logic
//         style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
//       >
//         <CustomDownloadButton />
//       </button>
//     </div>
//   ),
// };

// const DocumentViewPending: React.FC = () => {
//   const documentLoading = false; // Set this to your actual loading state

//   return (
//     <div className="p-3 lg:ml-64 z-10 static" style={{ marginTop: '70px' }}>
//       <Loader type="LOADER" loading={documentLoading}>
//         <div className="Pandingactionb1">
//           <DataTable options={options} />
//         </div>
//       </Loader>
//     </div>
//   );
// };

// export default DocumentViewPending;
