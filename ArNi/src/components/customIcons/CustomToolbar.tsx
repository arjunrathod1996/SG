// import React from 'react';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ViewColumnIcon from '@mui/icons-material/ViewColumn';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import SearchIcon from '@mui/icons-material/Search';

// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload, handleSearch }) => (
//     <div style={{ display: 'flex', gap: '8px' }}>
//         <FilterListIcon onClick={handleFilter} aria-label="Filter list" role="img" />
//         <ViewColumnIcon onClick={handleViewColumns} aria-label="View columns" role="img" />
//         <CloudDownloadIcon onClick={handleDownload} aria-label="Download" role="img" />
//         <SearchIcon onClick={handleSearch} aria-label="Search" role="img" />
//     </div>
// );

// export default CustomToolbar;

import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchIcon from '@mui/icons-material/Search';

const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload, handleSearch }) => (
    <div style={{ display: 'flex', gap: '8px' }}>
        <FilterListIcon onClick={handleFilter} aria-label="Filter list" role="img" />
        <ViewColumnIcon onClick={handleViewColumns} aria-label="View columns" role="img" />
        <CloudDownloadIcon onClick={handleDownload} aria-label="Download" role="img" />
        <SearchIcon onClick={handleSearch} aria-label="Search" role="img" />
    </div>
);

export default CustomToolbar;

