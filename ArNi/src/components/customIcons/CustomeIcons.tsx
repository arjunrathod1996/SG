// import React from 'react';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ViewColumnIcon from '@mui/icons-material/ViewColumn';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import SearchIcon from '@mui/icons-material/Search';

// const CustomFilterListIcon = (props) => (
//     <FilterListIcon {...props} aria-label="Filter list" role="img" />
// );

// const CustomViewColumnIcon = (props) => (
//     <ViewColumnIcon {...props} aria-label="View columns" role="img" />
// );

// const CustomCloudDownloadIcon = (props) => (
//     <CloudDownloadIcon {...props} aria-label="Download" role="img" />
// );

// const CustomSearchIcon = (props) => (
//     <SearchIcon {...props} aria-label="Search" role="img" />
// );


// CustomIcon.tsx or CustomIcon.js
// import React from 'react';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ViewColumnIcon from '@mui/icons-material/ViewColumn';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import SearchIcon from '@mui/icons-material/Search';

// export const CustomFilterListIcon = (props) => (
//     <FilterListIcon {...props} aria-label="Filter list" role="img" />
// );

// export const CustomViewColumnIcon = (props) => (
//     <ViewColumnIcon {...props} aria-label="View columns" role="img" />
// );

// export const CustomCloudDownloadIcon = (props) => (
//     <CloudDownloadIcon {...props} aria-label="Download" role="img" />
// );

// export const CustomSearchIcon = (props) => (
//     <SearchIcon {...props} aria-label="Search" role="img" />
// );


// CustomIcon.tsx or CustomIcon.js
// import React from 'react';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ViewColumnIcon from '@mui/icons-material/ViewColumn';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import SearchIcon from '@mui/icons-material/Search';

// const CustomFilterListIcon = (props) => (
//     <FilterListIcon {...props} aria-label="Filter list" role="img" />
// );

// const CustomViewColumnIcon = (props) => (
//     <ViewColumnIcon {...props} aria-label="View columns" role="img" />
// );

// const CustomCloudDownloadIcon = (props) => (
//     <CloudDownloadIcon {...props} aria-label="Download" role="img" />
// );

// const CustomSearchIcon = (props) => (
//     <SearchIcon {...props} aria-label="Search" role="img" />
// );

// export default {
//     CustomFilterListIcon,
//     CustomViewColumnIcon,
//     CustomCloudDownloadIcon,
//     CustomSearchIcon
// };


// CustomIcon.tsx or CustomIcon.js
// import React from 'react';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ViewColumnIcon from '@mui/icons-material/ViewColumn';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import SearchIcon from '@mui/icons-material/Search';

// const CustomFilterListIcon = (props) => (
//     <FilterListIcon {...props} aria-label="Filter list" role="img" />
// );

// const CustomViewColumnIcon = (props) => (
//     <ViewColumnIcon {...props} aria-label="View columns" role="img" />
// );

// const CustomCloudDownloadIcon = (props) => (
//     <CloudDownloadIcon {...props} aria-label="Download" role="img" />
// );

// const CustomSearchIcon = (props) => (
//     <SearchIcon {...props} aria-label="Search" role="img" />
// );

// const CustomIcons = {
//     CustomFilterListIcon,
//     CustomViewColumnIcon,
//     CustomCloudDownloadIcon,
//     CustomSearchIcon
// };

// export default CustomIcons;


// CustomIcon.tsx
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchIcon from '@mui/icons-material/Search';

// export const CustomFilterListIcon = (props) => (
//     <FilterListIcon {...props} aria-label="Filter list" role="img" />
// );

// export const CustomViewColumnIcon = (props) => (
//     <ViewColumnIcon {...props} aria-label="View columns" role="img" />
// );

// export const CustomCloudDownloadIcon = (props) => (
//     <CloudDownloadIcon {...props} aria-label="Download" role="img" />
// );

// export const CustomSearchIcon = (props) => (
//     <SearchIcon {...props} aria-label="Search" role="img" />
// );

export const CustomFilterListIcon = (props) => (
    <FilterListIcon {...props} alt="Filter list" role="img" />
);

export const CustomViewColumnIcon = (props) => (
    <ViewColumnIcon {...props} alt="View columns" role="img" />
);

export const CustomCloudDownloadIcon = (props) => (
    <CloudDownloadIcon {...props} alt="Download" role="img" />
);

export const CustomSearchIcon = (props) => (
    <SearchIcon {...props} alt="Search" role="img" />
);


// solution for this 

// option - 1


// import FilterListIcon from '@material-ui/icons/FilterListIcon'; // Import if required

// export const CustomFilterListIcon = (props: React.ComponentProps<typeof FilterListIcon>) => (
//     <FilterListIcon {...props} alt="Filter list" role="img" />
// );


// option - 2

// import { FC } from 'react';
// import FilterListIcon from '@material-ui/icons/FilterListIcon'; // Import if required

// interface CustomFilterListIconProps {
//     // Define the props you expect here, for example:
//     className?: string;
//     style?: React.CSSProperties;
// }

// export const CustomFilterListIcon: FC<CustomFilterListIconProps> = (props) => (
//     <FilterListIcon {...props} alt="Filter list" role="img" />
// );

// src/components/icons/CustomIcons.tsx


interface IconProps {
    className?: string; // Allow passing additional class names
  }
// Define the CustomDownloadIcon component
export const CustomDownloadIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Download"
  >
    <path d="M12 16l4-4h-3V2H11v10H8l4 4zm0 6c-4.418 0-8-3.582-8-8h2c0 3.313 2.687 6 6 6s6-2.687 6-6h2c0 4.418-3.582 8-8 8z" fill="#000"/>
  </svg>
);

// Define the CustomFilterIcon component
export const CustomFilterIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Filter"
  >
    <path d="M17 13H7v-2h10v2zm-2-4H9V7h6v2z" fill="#000"/>
  </svg>
);
