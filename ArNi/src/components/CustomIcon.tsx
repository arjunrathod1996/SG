

// src/components/CustomIcon.tsx

// import React from 'react';
// import { SvgIcon, SvgIconProps } from '@mui/material';

// // Custom wrapper for SVG icons
// const CustomIcon: React.FC<SvgIconProps> = (props) => {
//     return (
//         <SvgIcon {...props} role="img"  aria-label={props['aria-label'] || "icon"}>
//             {props.children}
//         </SvgIcon>
//     );
// };

// export default CustomIcon;

// import React from 'react';
// import { SvgIcon, SvgIconProps } from '@mui/material';

// interface CustomIconProps extends SvgIconProps {
//     alt?: string; // Custom prop for "alt" text
// }

// // Custom wrapper for SVG icons
// const CustomIcon: React.FC<CustomIconProps> = ({ alt, ...props }) => {
//     return (
//         <SvgIcon
//             {...props}
//             role="img"
//             aria-label={alt || props['aria-label'] || "icon"} // Use the custom alt prop if provided
//            // alt = {alt}
//         >
//             {props.children}
//         </SvgIcon>
//     );
// };

// export default CustomIcon;


import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

interface CustomIconProps extends SvgIconProps {
    alt?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ alt, ...props }) => {
    return (
        <SvgIcon
            {...props}
            role="img"
            aria-label={alt || "icon"}
        >
            {props.children}
        </SvgIcon>
    );
};

export default CustomIcon;
