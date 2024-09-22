

// In DataTable.js or DataTable.ts
// const DataTable = () => {
//     // Your DataTable component logic here
//     return <div>DataTable Component</div>;
// };

// export default DataTable;


// Inside DataTable.tsx (or similar file)
import React from 'react';
import MUIDataTable from 'mui-datatables'; // Assuming you are using mui-datatables
import { MUIDataTableOptions } from 'mui-datatables';

interface DataTableProps {
    title: string;
    options?: MUIDataTableOptions; // Add options as a prop
    data: any[]; // Adjust this according to your data structure
    columns: any[]; // Adjust this according to your columns structure
}

const DataTable: React.FC<DataTableProps> = ({ title, options, data, columns }) => {
    return (
        <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={options} // Pass the options prop to MUIDataTable
        />
    );
};

export default DataTable;


// src/components/DataTable.tsx

// import React from 'react';
// import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';

// interface DataTableProps {
//   options?: MUIDataTableOptions; // Add options as a prop
// }

// const DataTable: React.FC<DataTableProps> = ({ options }) => {
//   return (
//     <MUIDataTable
//       options={options} // Pass the options prop to MUIDataTable
//     />
//   );
// };

// export default DataTable;



