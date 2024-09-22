
// import React from "react";
// import Loader from "../../../../components/Loader/Loader";
// import DataTable from "../../../../components/DataTable";
// import { MUIDataTableOptions } from "mui-datatables";


// const options: MUIDataTableOptions = {
//     download: true,
//     filterType:'multiselect',
//     fixedHeader:true,
//     downloadOptions:{
//         filename:'MyPendingDocumentViewList',
//         separator:',',
//         filterOptions:{
//             useDisplayedColumnsOnly:true,
//             useDisplayedRowsOnly:true
//         },
//         onDownload:(buildHead, buildBody, columns, data) => {
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`
//         }
//     }
// }

// const DocumentViewPending= () =>{
//     return (
//         <>
//             <div className="p-3 lg:ml-64 z-10 static" >
//                 {/* <Loader type="LOADER" loading={documentLoading}></Loader> */}
//                 <div className="Pandingactionb1">
//                     <DataTable 
//                         options = {options}>
//                     </DataTable>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DocumentViewPending;

// import React from "react";
// import Loader from "../../../../components/Loader/Loader";
// import DataTable from "../../../../components/DataTable";
// import { MUIDataTableOptions } from "mui-datatables";

// const options: MUIDataTableOptions = {
//     download: true,
//     filterType: 'multiselect',
//     fixedHeader: true,
//     downloadOptions: {
//         filename: 'MyPendingDocumentViewList',
//         separator: ',',
//         filterOptions: {
//             useDisplayedColumnsOnly: true,
//             useDisplayedRowsOnly: true
//         },
//     },
//     // Move onDownload to the options object
//     onDownload: (buildHead, buildBody, columns, data) => {
//         return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//     }
// };

// const DocumentViewPending = () => {
//     const documentLoading = false; // Set this to your actual loading state

//     return (
//         <>
//             <div className="p-3 lg:ml-64 z-10 static">
//                 <Loader type="LOADER" loading={documentLoading}>
//                     <div className="Pandingactionb1">
//                         <DataTable
//                             options={options}
//                         />
//                     </div>
//                 </Loader>
//             </div>
//         </>
//     );
// };

// export default DocumentViewPending;



// import CustomIcon from "../../../../components/CustomIcon";
// import DownloadIcon from "@mui/icons-material/GetApp";
// import SortIcon from "@mui/icons-material/ArrowDownward";

//import { IconButton } from "@mui/material";



//import FilterListIcon from "@mui/icons-material/FilterList"; // Example additional icon
//import AddIcon from "@mui/icons-material/Add"; // Example additional icon



// const options: MUIDataTableOptions = {
//     download: true, // Disable default download
//     filterType: "multiselect",
//     fixedHeader: true,
//     // customToolbar: () => (
//     //     <IconButton>
//     //         <CustomIcon alt="Download CSV">
//     //             <DownloadIcon />
//     //         </CustomIcon>
//     //     </IconButton>
//     // ),
//     customSort: (data, colIndex, order) => {
//         return data.sort((a, b) => {
//             let valA = a[colIndex];
//             let valB = b[colIndex];

//             if (order === "asc") {
//                 return valA < valB ? -1 : 1;
//             }
//             return valA > valB ? -1 : 1;
//         });
//     }
// };


// // const options: MUIDataTableOptions = {
// //     download: false, // Disable default download
// //     filterType: "multiselect",
// //     fixedHeader: true,
// //     customToolbar: () => (
// //         <div>
// //             <IconButton
// //                 onClick={() => {
// //                     const csvContent = "data:text/csv;charset=utf-8,Name,Value\nJohn Doe,123";
// //                     const encodedUri = encodeURI(csvContent);
// //                     const link = document.createElement("a");
// //                     link.setAttribute("href", encodedUri);
// //                     link.setAttribute("download", "data.csv");
// //                     document.body.appendChild(link);
// //                     link.click();
// //                     document.body.removeChild(link);
// //                 }}
// //             >
// //                 <CustomIcon alt="Download CSV">
// //                     <DownloadIcon />
// //                 </CustomIcon>
// //             </IconButton>
// //             <IconButton  title="Filter Table" onClick={() => console.log("Filter clicked")}>
// //                 <CustomIcon alt="Filter Table">
// //                     <FilterListIcon />
// //                 </CustomIcon>
// //             </IconButton>
// //             <IconButton onClick={() => console.log("Add clicked")}>
// //                 <CustomIcon alt="Add Item">
// //                     <AddIcon />
// //                 </CustomIcon>
// //             </IconButton>
// //         </div>
// //     ),
// //     customSort: (data, colIndex, order) => {
// //         return data.sort((a, b) => {
// //             let valA = a[colIndex];
// //             let valB = b[colIndex];

// //             if (order === "asc") {
// //                 return valA < valB ? -1 : 1;
// //             }
// //             return valA > valB ? -1 : 1;
// //         });
// //     }
// // };


// const data = [
//     // Add your data here
// ];

// const columns = [
//     {
//         name: "Name",
//         label: "Name",
//         options: {
//             sort: true,
//             customHeadRender: () => (
//                 <CustomIcon aria-label="Sort Column">
//                     <SortIcon />
//                 </CustomIcon>
//             )
//         }
//     },
//     // Add other column definitions here
// ];

// const DocumentViewPending = () => {
//     const documentLoading = false; // Set this to your actual loading state

//     return (
        
//             <Loader type="LOADER" loading={documentLoading}>
               
//                     <DataTable
//                         data={data}
//                         columns={columns}
//                         options={options}
//                     />
                
//             </Loader>
       
//     );
// };

// export default DocumentViewPending;

// ==========================================


import { useStoreActions, useStoreState } from '../../../../store/hooks';
import {useColDef} from '../../../../hooks/useColDef';
import { DocumentDetails } from "../../../../store/PolicyList/MyPendingAction/MyPendingActionDetail.type";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../../../../components/Loader/Loader";
import DataTable from "../../../../components/DataTable";



// const DocumentViewPending = () => {
//     //const documentLoading = false; // Set this to your actual loading state
//     const {documentList, documentLoading} = useStoreState(state => state.pnp.policyList.myPendingActionList);
//     const {myPendingActionDocumentList: myPendingActionDocumentListColumns} = useColDef();

//     const options: MUIDataTableOptions = {
//         download: true, // Disable default download
//         filterType: "multiselect",
//         fixedHeader: true,
//         downloadOptions:{
//             filename: "MyPendingDocumentViewList",
//             separator:',',
//             filterOptions: {
//                 useDisplayedColumnsOnly:true,
//                 useDisplayedRowsOnly:true,
//             },
//         }, 
    
//         onDownload:(buildHead, buildBody, columns, data) =>{
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//         },
    
//         selectableRowsHeader: true,
//         onRowClick:(_rowData:any, rowMeta: { dataIndex: number; rowIndex: number}) => {
//             const policyDetails: any = documentList[rowMeta.dataIndex];
//             window.open('/pnp/inProgress/:policyId'.replace(':policyId', String(policyDetails.policyId)), '_blank');
//         },
//     };

//     const myPendingActionDocumentMapper = useCallback(
//         (documentData : DocumentDetails) => {
//             return {

//             }
//         }
//     );
    
//     return (
//             <Loader type="LOADER" loading={documentLoading}>
//                     <DataTable
//                         columns={myPendingActionDocumentListColumns}
//                         data={documentList.map(myPendingActionDocumentMapper)}
//                         options={options}
//                     />
//             </Loader>
       
//     );
// };

// export default DocumentViewPending;


// const DocumentViewPending = () => {
//     //const documentLoading = false; // Set this to your actual loading state
//     // const { documentList, documentLoading } = useStoreState(
//     //     (state) => state.pnp.policyList.myPendingActionList
//     // );
//     const { myPendingActionDocumentList: myPendingActionDocumentListColumns } =
//         useColDef();

//     const options: MUIDataTableOptions = {
//         download: true, // Enable download
//         filterType: "multiselect",
//         fixedHeader: true,
//         downloadOptions: {
//             filename: "MyPendingDocumentViewList",
//             separator: ",",
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },

//         onDownload: (buildHead, buildBody, columns, data) => {
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//         },

//         selectableRowsHeader: true,
//         onRowClick: (_rowData: any, rowMeta: { dataIndex: number; rowIndex: number }) => {
//             // const policyDetails: any = documentList[rowMeta.dataIndex];
//             // window.open(
//             //     `/pnp/inProgress/${policyDetails.policyId}`,
//             //     "_blank"
//             // );
//         },
//     };

//     const documentLoading = false;

//     // Add the missing dependency array for useCallback
//     const myPendingActionDocumentMapper = useCallback(
//         (documentData: DocumentDetails) => {
//             return {
                
//                 // Add the appropriate fields for your document data
//             };
//         },
//         [] // Add dependencies here, e.g., documentList if it's used in the callback
//     );

   

//     return (
//         <Loader type="LOADER" loading={documentLoading}>
//             <DataTable
//                 columns={myPendingActionDocumentListColumns}
//                // data={documentList.map(myPendingActionDocumentMapper)}
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;




// Define hard-coded data
// const hardCodedData: DocumentDetails[] = Array.from({ length: 20 }, (_, index) => ({
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

// const DocumentViewPending = () => {
//     const { myPendingActionDocumentList: myPendingActionDocumentListColumns } = useColDef();

//     const options: MUIDataTableOptions = {
//         download: true, // Enable download
//         filterType: 'multiselect',
//         fixedHeader: true,
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => {
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//         },
//         selectableRowsHeader: true,
//         onRowClick: (_rowData: any, rowMeta: { dataIndex: number; rowIndex: number }) => {
//             // const policyDetails: any = documentList[rowMeta.dataIndex];
//             // window.open(
//             //     `/pnp/inProgress/${policyDetails.policyId}`,
//             //     '_blank'
//             // );
//         },
//     };

//     // Map the hard-coded data
//     const myPendingActionDocumentMapper = useCallback(
//         (documentData: DocumentDetails) => {
//             return {
//                 policyId: documentData.policyId,
//                 domainRisk: documentData.domainRisk,
//                 documentName: documentData.documentName,
//                 sgCodeReference: documentData.sgCodeReference,
//                 policyPublicationDate: documentData.policyPublicationDate,
//                 documentType: documentData.documentType,
//                 busu: documentData.busu,
//                 implementationDeadlineDate: documentData.implementationDeadlineDate,
//                 dispensationDeadlineDate: documentData.dispensationDeadlineDate,
//                 mypnpStatus: documentData.mypnpStatus,
//             };
//         },
//         []
//     );

//     return (
//         <Loader type="LOADER" loading={false}> {/* Adjust loading state if needed */}
//             <DataTable
//                 columns={myPendingActionDocumentListColumns}
//                 data={hardCodedData.map(myPendingActionDocumentMapper)}
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;

//=================================





import MUIDataTable, { MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { CustomCloudDownloadIcon, CustomFilterListIcon, CustomSearchIcon, CustomViewColumnIcon } from '../../../../components/customIcons/CustomeIcons';
//import CustomToolbar from '../../../../components/customIcons/CustomToolbar';


// Hard-coded data
// const hardCodedData: DocumentDetails[] = Array.from({ length: 20 }, (_, index) => ({
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

// const DocumentViewPending = () => {
//     const { myPendingActionDocumentList: myPendingActionDocumentListColumns } = useColDef();

//     const options: MUIDataTableOptions = {
//         download: true,
//         filterType: 'multiselect', // Ensure this is a valid FilterType
//         fixedHeader: true,
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => {
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//         },
//         selectableRowsHeader: true,
//         onRowClick: (rowData, rowMeta) => {
//             // Implement row click action
//             // const policyDetails = hardCodedData[rowMeta.dataIndex];
//             // window.open(`/pnp/inProgress/${policyDetails.policyId}`, '_blank');
//         },
//         pagination: true,
//         sort: true,
//         filter: true,
//         responsive: 'standard', // Use valid value for responsive
//     };

//     const myPendingActionDocumentMapper = useCallback(
//         (documentData: DocumentDetails) => ({
//             policyId: documentData.policyId,
//             domainRisk: documentData.domainRisk,
//             documentName: documentData.documentName,
//             sgCodeReference: documentData.sgCodeReference,
//             policyPublicationDate: documentData.policyPublicationDate,
//             documentType: documentData.documentType,
//             busu: documentData.busu,
//             implementationDeadlineDate: documentData.implementationDeadlineDate,
//             dispensationDeadlineDate: documentData.dispensationDeadlineDate,
//             mypnpStatus: documentData.mypnpStatus,
//         }),
//         []
//     );

//     return (
//         <Loader type="LOADER" loading={false}> {/* Adjust loading state if needed */}
//             <DataTable
//                 title={"Pending Document View"}
//                 columns={myPendingActionDocumentListColumns}
//                 data={hardCodedData.map(myPendingActionDocumentMapper)}
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;







// const hardCodedData: DocumentDetails[] = Array.from({ length: 20 }, (_, index) => ({
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

// const DocumentViewPending = () => {
//     const { myPendingActionDocumentList: columns } = useColDef();

//     // Update columns to include custom header rendering
//     const updatedColumns: MUIDataTableColumn[] = columns.map(column => ({
//         ...column,
//         options: {
//             ...column.options,
//             customHeadLabel: (columnMeta) => (
//                 <span style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
//                     {columnMeta.name}
//                 </span>
//             ),
//         }
//     }));

//     const options: MUIDataTableOptions = {
//         download: true,
//         filterType: 'multiselect',
//         fixedHeader: true,
//         responsive: 'standard', // Use 'vertical', 'standard', or 'simple'
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => {
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//         },
//         selectableRowsHeader: true,
//         onRowClick: (rowData, rowMeta) => {
//             // Implement row click action
//         },
//     };

//     return (
//         <Loader type="LOADER" loading={false}> {/* Adjust loading state if needed */}
//             <MUIDataTable
//                 title={'Pending Documents'}
//                 columns={updatedColumns}
//                 data={hardCodedData}
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;


// const hardCodedData: DocumentDetails[] = Array.from({ length: 20 }, (_, index) => ({
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

// const DocumentViewPending = () => {
//     const { myPendingActionDocumentList: columns } = useColDef();

//     // Define mapper function with useCallback
//     const myPendingActionDocumentMapper = useCallback(
//         (documentData: DocumentDetails) => ({
//             policyId: documentData.policyId,
//             domainRisk: documentData.domainRisk,
//             documentName: documentData.documentName,
//             sgCodeReference: documentData.sgCodeReference,
//             policyPublicationDate: documentData.policyPublicationDate,
//             documentType: documentData.documentType,
//             busu: documentData.busu,
//             implementationDeadlineDate: documentData.implementationDeadlineDate,
//             dispensationDeadlineDate: documentData.dispensationDeadlineDate,
//             mypnpStatus: documentData.mypnpStatus,
//         }),
//         []
//     );

//     // Update columns to include custom header rendering with tooltip
//     const updatedColumns: MUIDataTableColumn[] = columns.map(column => ({
//         ...column,
//         options: {
//             ...column.options,
//             customHeadLabel: (columnMeta) => (
//                 <Tooltip
//                     title={`Sort by ${columnMeta.name}`} // Tooltip showing "Sort by {label}"
//                     arrow
//                 >
//                     <span style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
//                         {columnMeta.name} {/* Use the name for display */}
//                     </span>
//                 </Tooltip>
//             ),
//         }
//     }));

//     const options: MUIDataTableOptions = {
//         download: true,
//         filterType: 'multiselect',
//         fixedHeader: true,
//         responsive: 'standard', // Use 'vertical', 'standard', or 'simple'
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => {
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//         },
//         selectableRows: 'none', // This hides the checkboxes
//         onRowClick: (rowData, rowMeta) => {
//             // Implement row click action
//         },
//     };

//     return (
//         <Loader type="LOADER" loading={false}> {/* Adjust loading state if needed */}
//             <MUIDataTable
//                 title={'Pending Documents'}
//                 columns={updatedColumns}
//                 data={hardCodedData} // Use hardCodedData here
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;


// import CustomFilterListIcon from '../../../../components/CustomIcon';
// import CustomViewColumnIcon from '../../../../components/CustomIcon';
// import CustomCloudDownloadIcon from '../../../../components/CustomIcon';
// import CustomSearchIcon from '../../../../components/CustomIcon';

// DocumentViewPending.tsx or DocumentViewPending.js
// DocumentViewPending.tsx

// DocumentViewPending.tsx

// import { CustomFilterListIcon, CustomViewColumnIcon, CustomCloudDownloadIcon, CustomSearchIcon } from '../../../../components/CustomIcon'; // Ensure this path is correct

// const hardCodedData: DocumentDetails[] = Array.from({ length: 20 }, (_, index) => ({
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


// const DocumentViewPending = () => {
//     const { myPendingActionDocumentList: columns } = useColDef();


//     const CustomToolbar = () => (
//         <div>
//             <CustomFilterListIcon onClick={() => console.log('Filter clicked')} />
//             <CustomViewColumnIcon onClick={() => console.log('View columns clicked')} />
//             <CustomCloudDownloadIcon onClick={() => console.log('Download clicked')} />
//             <CustomSearchIcon onClick={() => console.log('Search clicked')} />
//         </div>
//     );
    

//     // Define mapper function with useCallback
//     const myPendingActionDocumentMapper = useCallback(
//         (documentData: DocumentDetails) => ({
//             policyId: documentData.policyId,
//             domainRisk: documentData.domainRisk,
//             documentName: documentData.documentName,
//             sgCodeReference: documentData.sgCodeReference,
//             policyPublicationDate: documentData.policyPublicationDate,
//             documentType: documentData.documentType,
//             busu: documentData.busu,
//             implementationDeadlineDate: documentData.implementationDeadlineDate,
//             dispensationDeadlineDate: documentData.dispensationDeadlineDate,
//             mypnpStatus: documentData.mypnpStatus,
//         }),
//         []
//     );

//     // Update columns to include custom header rendering with tooltip
//     const updatedColumns: MUIDataTableColumn[] = columns.map(column => ({
//         ...column,
//         options: {
//             ...column.options,
//             customHeadLabel: (columnMeta) => (
//                 <Tooltip
//                     title={`Sort by ${columnMeta.name}`} // Tooltip showing "Sort by {label}"
//                     arrow
//                 >
//                     <span style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
//                         {columnMeta.name} {/* Use the name for display */}
//                     </span>
//                 </Tooltip>
//             ),
//         }
//     }));

//     const options: MUIDataTableOptions = {
//         download: true,
//         filterType: 'multiselect',
//         fixedHeader: true,
//         responsive: 'standard', // Use 'vertical', 'standard', or 'simple'
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList.csv',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => {
//             return `\uFEFF${buildHead(columns)}${buildBody(data)}`;
//         },
//         selectableRows: 'none', // This hides the checkboxes
//         onRowClick: (rowData, rowMeta) => {
//             // Implement row click action
//         },
//         // customToolbar: () => (
//         //     <div>
//         //         <CustomFilterListIcon />
//         //         <CustomViewColumnIcon />
//         //         <CustomCloudDownloadIcon />
//         //         <CustomSearchIcon />
//         //     </div>
//         // ),

//         customToolbar: () => (
//             <CustomToolbar />
//         ),
//     };

//     return (
//         <Loader type="LOADER" loading={false}> {/* Adjust loading state if needed */}
//             <MUIDataTable
//                 title={'Pending Documents'}
//                 columns={updatedColumns}
//                 data={hardCodedData} // Use hardCodedData here
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;




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

// const DocumentViewPending = () => {
//     const { myPendingActionDocumentList: columns } = useColDef();

//     const handleFilter = () => {
//         // Implement filter functionality
//         console.log('Filter icon clicked');
//     };
    
//     const handleViewColumns = () => {
//         // Implement column view functionality
//         console.log('View columns icon clicked');
//     };
    
//     const handleDownload = () => {
//         // Implement download functionality
//         console.log('Download icon clicked');
//     };
    
//     const handleSearch = () => {
//         // Implement search functionality
//         console.log('Search icon clicked');
//     };

//     const myPendingActionDocumentMapper = useCallback(
//         (documentData) => ({
//             policyId: documentData.policyId,
//             domainRisk: documentData.domainRisk,
//             documentName: documentData.documentName,
//             sgCodeReference: documentData.sgCodeReference,
//             policyPublicationDate: documentData.policyPublicationDate,
//             documentType: documentData.documentType,
//             busu: documentData.busu,
//             implementationDeadlineDate: documentData.implementationDeadlineDate,
//             dispensationDeadlineDate: documentData.dispensationDeadlineDate,
//             mypnpStatus: documentData.mypnpStatus,
//         }),
//         []
//     );

//     const updatedColumns = columns.map(column => ({
//         ...column,
//         options: {
//             ...column.options,
//             customHeadLabel: (columnMeta) => (
//                 <Tooltip title={`Sort by ${columnMeta.name}`} arrow>
//                     <span style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold', textAlign: 'center', padding: '10px' }}>
//                         {columnMeta.name}
//                     </span>
//                 </Tooltip>
//             ),
//         }
//     }));

//     const options: MUIDataTableOptions = {
//         download: true,
//         filterType: 'multiselect', // Ensure 'multiselect' is a valid value
//         fixedHeader: true,
//         responsive: 'standard',
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList.csv',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => `\uFEFF${buildHead(columns)}${buildBody(data)}`,
//         selectableRows: 'none',
//         onRowClick: (rowData, rowMeta) => console.log('Row clicked:', rowData, rowMeta),
//         customToolbar: () => (
//             <CustomToolbar
//                 handleFilter={handleFilter}
//                 handleViewColumns={handleViewColumns}
//                 handleDownload={handleDownload}
//                 handleSearch={handleSearch}
//             />
//         ),
//     };

//     return (
//         <Loader type="LOADER" loading={false}>
//             <MUIDataTable
//                 title={'Pending Documents'}
//                 columns={updatedColumns}
//                 data={hardCodedData}
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;




import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from 'reactstrap';

// Define hard-coded data
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

// // CustomToolbar component
// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload, handleSearch }) => (
//     <div style={{ display: 'flex', gap: '8px' }}>
//         <Tooltip title="Filter" arrow>
//             <FilterListIcon onClick={handleFilter} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="View Columns" arrow>
//             <ViewColumnIcon onClick={handleViewColumns} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="Download" arrow>
//             <CloudDownloadIcon onClick={handleDownload} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="Search" arrow>
//             <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//     </div>
// );

// const DocumentViewPending = () => {
//     const [searchText, setSearchText] = useState('');
//     const [filterList, setFilterList] = useState([]);

//     // Implement filter functionality
//     const handleFilter = () => {
//         console.log('Filter icon clicked');
//         // This can be used to open a filter dialog or manipulate filterList
//         // For example, you can use a library or custom modal here
//     };

//     // Implement column view functionality
//     const handleViewColumns = () => {
//         console.log('View columns icon clicked');
//         // This can be used to open a column selection dialog or toggle columns visibility
//         // Use MUIDataTable's built-in functionality or create a custom dialog/modal
//     };

//     // Implement download functionality
//     const handleDownload = () => {
//         console.log('Download icon clicked');
//         const csvContent = [
//             ['Policy ID', 'Domain Risk', 'Document Name', 'SG Code Reference', 'Publication Date', 'Document Type', 'BUSU', 'Implementation Deadline', 'Dispensation Deadline', 'Status'],
//             ...hardCodedData.map(item => [
//                 item.policyId,
//                 item.domainRisk,
//                 item.documentName,
//                 item.sgCodeReference,
//                 item.policyPublicationDate,
//                 item.documentType,
//                 item.busu,
//                 item.implementationDeadlineDate,
//                 item.dispensationDeadlineDate,
//                 item.mypnpStatus,
//             ]),
//         ]
//             .map(e => e.join(','))
//             .join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         if (link.download !== undefined) {
//             // For browsers that support HTML5 download attribute
//             const url = URL.createObjectURL(blob);
//             link.setAttribute('href', url);
//             link.setAttribute('download', 'MyPendingDocumentViewList.csv');
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     };

//     // Implement search functionality
//     const handleSearch = () => {
//         console.log('Search icon clicked');
//         // This can be used to open a search dialog or filter data based on searchText
//         // Example of setting searchText (you may have an input field for user input)
//         // setSearchText('some search query');
//     };

//     const columns: MUIDataTableColumn[] = [
//         { name: 'policyId', label: 'Policy ID' },
//         { name: 'domainRisk', label: 'Domain Risk' },
//         { name: 'documentName', label: 'Document Name' },
//         { name: 'sgCodeReference', label: 'SG Code Reference' },
//         { name: 'policyPublicationDate', label: 'Publication Date' },
//         { name: 'documentType', label: 'Document Type' },
//         { name: 'busu', label: 'BUSU' },
//         { name: 'implementationDeadlineDate', label: 'Implementation Deadline' },
//         { name: 'dispensationDeadlineDate', label: 'Dispensation Deadline' },
//         { name: 'mypnpStatus', label: 'Status' },
//     ];

//     const options: MUIDataTableOptions = {
//         filterType: 'multiselect', // Ensure this is valid for MUIDataTable
//         fixedHeader: true,
//         responsive: 'standard',
//         download: true,
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList.csv',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => `\uFEFF${buildHead(columns)}${buildBody(data)}`,
//         selectableRows: 'none',
//         customToolbar: () => (
//             <CustomToolbar
//                 handleFilter={handleFilter}
//                 handleViewColumns={handleViewColumns}
//                 handleDownload={handleDownload}
//                 handleSearch={handleSearch}
//             />
//         ),
//         // Add additional options if needed
//     };

//     return (
//         <Loader type="LOADER" loading={false}>
//             <MUIDataTable
//                 title={'Pending Documents'}
//                 columns={columns}
//                 data={hardCodedData}
//                 options={options}
//             />
//         </Loader>
//     );
// };

// export default DocumentViewPending;





// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

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

// // CustomToolbar component
// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
//     <div style={{ display: 'flex', gap: '8px' }}>
//         <Tooltip title="Filter" arrow>
//             <FilterListIcon onClick={handleFilter} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="View Columns" arrow>
//             <ViewColumnIcon onClick={handleViewColumns} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="Download" arrow>
//             <CloudDownloadIcon onClick={handleDownload} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         {/* <Tooltip title="Search" arrow>
//             <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
//         </Tooltip> */}
//     </div>
// );

// // Main component
// const DocumentViewPending = () => {
//     const [searchText, setSearchText] = useState('');
//     const [filterDialogOpen, setFilterDialogOpen] = useState(false);
//     const [columnDialogOpen, setColumnDialogOpen] = useState(false);
//     const [selectedColumns, setSelectedColumns] = useState([
//         { id: 'policyId', name: 'Policy ID', visible: true },
//         { id: 'domainRisk', name: 'Domain Risk', visible: true },
//         { id: 'documentName', name: 'Document Name', visible: true },
//         { id: 'sgCodeReference', name: 'SG Code Reference', visible: true },
//         { id: 'policyPublicationDate', name: 'Publication Date', visible: true },
//         { id: 'documentType', name: 'Document Type', visible: true },
//         { id: 'busu', name: 'BUSU', visible: true },
//         { id: 'implementationDeadlineDate', name: 'Implementation Deadline', visible: true },
//         { id: 'dispensationDeadlineDate', name: 'Dispensation Deadline', visible: true },
//         { id: 'mypnpStatus', name: 'Status', visible: true },
//     ]);

//     const [filteredData, setFilteredData] = useState(hardCodedData);

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

//     // Filter dialog
//     const FilterDialog = ({ open, onClose, onApply }) => {
//         const [filter, setFilter] = useState('');

//         const handleApply = () => {
//             onApply(filter);
//             onClose();
//         };

//         return (
//             <Dialog open={open} onClose={onClose}>
//                 <DialogTitle>Filter Options</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Filter Text"
//                         type="text"
//                         fullWidth
//                         variant="standard"
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose}>Cancel</Button>
//                     <Button onClick={handleApply}>Apply</Button>
//                 </DialogActions>
//             </Dialog>
//         );
//     };

//     // Column selection dialog
//     const ColumnSelectionDialog = ({ open, onClose, columns, onApply }) => {
//         const handleToggleColumn = (columnId) => {
//             setSelectedColumns(prev =>
//                 prev.map(col =>
//                     col.id === columnId ? { ...col, visible: !col.visible } : col
//                 )
//             );
//         };

//         const handleApply = () => {
//             onApply(selectedColumns.filter(col => col.visible).map(col => col.id));
//             onClose();
//         };

//         return (
//             <Dialog open={open} onClose={onClose}>
//                 <DialogTitle>Choose Columns</DialogTitle>
//                 <DialogContent>
//                     {columns.map((col) => (
//                         <FormControlLabel
//                             key={col.id}
//                             control={<Checkbox checked={col.visible} onChange={() => handleToggleColumn(col.id)} />}
//                             label={col.name}
//                         />
//                     ))}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose}>Cancel</Button>
//                     <Button onClick={handleApply}>Apply</Button>
//                 </DialogActions>
//             </Dialog>
//         );
//     };

//     // Handle functions
//     const handleFilter = () => setFilterDialogOpen(true);

//     const handleViewColumns = () => setColumnDialogOpen(true);

//     const handleDownload = () => {
//         console.log('Download icon clicked');
//         const csvContent = [
//             ['Policy ID', 'Domain Risk', 'Document Name', 'SG Code Reference', 'Publication Date', 'Document Type', 'BUSU', 'Implementation Deadline', 'Dispensation Deadline', 'Status'],
//             ...filteredData.map(item => [
//                 item.policyId,
//                 item.domainRisk,
//                 item.documentName,
//                 item.sgCodeReference,
//                 item.policyPublicationDate,
//                 item.documentType,
//                 item.busu,
//                 item.implementationDeadlineDate,
//                 item.dispensationDeadlineDate,
//                 item.mypnpStatus,
//             ]),
//         ]
//             .map(e => e.join(','))
//             .join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         if (link.download !== undefined) {
//             // For browsers that support HTML5 download attribute
//             const url = URL.createObjectURL(blob);
//             link.setAttribute('href', url);
//             link.setAttribute('download', 'MyPendingDocumentViewList.csv');
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     };

//     // useEffect to handle search when searchText changes
//     useEffect(() => {
//         const filtered = hardCodedData.filter(item => 
//             Object.values(item).some(value => 
//                 value.toLowerCase().includes(searchText.toLowerCase())
//             )
//         );
//         setFilteredData(filtered);
//     }, [searchText]);

//     // Data columns and options
//        const options: MUIDataTableOptions = {
//         filterType: 'multiselect', // Ensure this is valid for MUIDataTable
//         fixedHeader: true,
//         responsive: 'standard',
//         download: true,
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList.csv',
//             separator: ',',
//             filterOptions: {
//                 useDisplayedColumnsOnly: true,
//                 useDisplayedRowsOnly: true,
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => `\uFEFF${buildHead(columns)}${buildBody(data)}`,
//         selectableRows: 'none',
//         customToolbar: () => (
//             <CustomToolbar
//                 handleFilter={handleFilter}
//                 handleViewColumns={handleViewColumns}
//                 handleDownload={handleDownload}
//               //  handleSearch={handleSearch}
//             />
//         ),
//         // Add additional options if needed
//     };

//     return (
//         <div>
//             <FilterDialog
//                 open={filterDialogOpen}
//                 onClose={() => setFilterDialogOpen(false)}
//                 onApply={(filter) => setSearchText(filter)}
//             />
//             <ColumnSelectionDialog
//                 open={columnDialogOpen}
//                 onClose={() => setColumnDialogOpen(false)}
//                 columns={selectedColumns}
//                 onApply={(visibleColumns) => {
//                     // Columns updated based on visibility
//                 }}
//             />
//             <MUIDataTable
//                 title={'Pending Documents'}
//                 columns={columns}
//                 data={filteredData}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default DocumentViewPending;



// working this is also................................


// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel} from '@mui/material';

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

// // CustomToolbar component
// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
//     <div style={{ display: 'flex', gap: '8px' }}>
//         <Tooltip title="Filter" arrow>
//             <FilterListIcon onClick={handleFilter} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="View Columns" arrow>
//             <ViewColumnIcon onClick={handleViewColumns} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="Download" arrow>
//             <CloudDownloadIcon onClick={handleDownload} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//     </div>
// );

// // ColumnSelectionDialog component
// const ColumnSelectionDialog = ({ open, onClose, columns, onApply }) => {
//     const [selectedColumns, setSelectedColumns] = useState(columns);

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

// // Main component
// const DocumentViewPending = () => {
//     const [searchText, setSearchText] = useState('');
//     const [filterDialogOpen, setFilterDialogOpen] = useState(false);
//     const [columnDialogOpen, setColumnDialogOpen] = useState(false);
//     const [selectedColumns, setSelectedColumns] = useState([
//         { id: 'policyId', name: 'Policy ID', visible: true },
//         { id: 'domainRisk', name: 'Domain Risk', visible: true },
//         { id: 'documentName', name: 'Document Name', visible: true },
//         { id: 'sgCodeReference', name: 'SG Code Reference', visible: true },
//         { id: 'policyPublicationDate', name: 'Publication Date', visible: true },
//         { id: 'documentType', name: 'Document Type', visible: true },
//         { id: 'busu', name: 'BUSU', visible: true },
//         { id: 'implementationDeadlineDate', name: 'Implementation Deadline', visible: true },
//         { id: 'dispensationDeadlineDate', name: 'Dispensation Deadline', visible: true },
//         { id: 'mypnpStatus', name: 'Status', visible: true },
//     ]);

//     const [filteredData, setFilteredData] = useState(hardCodedData);

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

//     // Filter dialog
//     const FilterDialog = ({ open, onClose, onApply }) => {
//         const [filter, setFilter] = useState('');

//         const handleApply = () => {
//             onApply(filter);
//             onClose();
//         };

//         return (
//             <Dialog open={open} onClose={onClose}>
//                 <DialogTitle>Filter Options</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Filter Text"
//                         type="text"
//                         fullWidth
//                         variant="standard"
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose}>Cancel</Button>
//                     <Button onClick={handleApply}>Apply</Button>
//                 </DialogActions>
//             </Dialog>
//         );
//     };

//     // Handle functions
//     const handleFilter = () => setFilterDialogOpen(true);

//     const handleViewColumns = () => setColumnDialogOpen(true);

//     const handleDownload = () => {
//         console.log('Download icon clicked');
//         const csvContent = [
//             ['Policy ID', 'Domain Risk', 'Document Name', 'SG Code Reference', 'Publication Date', 'Document Type', 'BUSU', 'Implementation Deadline', 'Dispensation Deadline', 'Status'],
//             ...filteredData.map(item => [
//                 item.policyId,
//                 item.domainRisk,
//                 item.documentName,
//                 item.sgCodeReference,
//                 item.policyPublicationDate,
//                 item.documentType,
//                 item.busu,
//                 item.implementationDeadlineDate,
//                 item.dispensationDeadlineDate,
//                 item.mypnpStatus,
//             ]),
//         ]
//             .map(e => e.join(','))
//             .join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         if (link.download !== undefined) {
//             // For browsers that support HTML5 download attribute
//             const url = URL.createObjectURL(blob);
//             link.setAttribute('href', url);
//             link.setAttribute('download', 'MyPendingDocumentViewList.csv');
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     };

//     // useEffect to handle search when searchText changes
//     useEffect(() => {
//         const filtered = hardCodedData.filter(item =>
//             Object.values(item).some(value =>
//                 value.toLowerCase().includes(searchText.toLowerCase())
//             )
//         );
//         setFilteredData(filtered);
//     }, [searchText]);

//     // Data columns and options
//     const options: MUIDataTableOptions = {
//         filterType: 'multiselect', // Allows multiple selections in filters
//         fixedHeader: true, // Keeps header fixed at the top
//         responsive: 'standard', // Adjusts table responsiveness
//         download: true, // Enables download button
//         downloadOptions: {
//             filename: 'MyPendingDocumentViewList.csv', // Filename for the exported file
//             separator: ',', // Separator for CSV columns
//             filterOptions: {
//                 useDisplayedColumnsOnly: true, // Only include displayed columns in the download
//                 useDisplayedRowsOnly: true, // Only include displayed rows in the download
//             },
//         },
//         onDownload: (buildHead, buildBody, columns, data) => `\uFEFF${buildHead(columns)}${buildBody(data)}`, // Ensures proper encoding
//         selectableRows: 'none', // Disables row selection
//         customToolbar: () => (
//             <CustomToolbar
//                 handleFilter={handleFilter}
//                 handleViewColumns={handleViewColumns}
//                 handleDownload={handleDownload}
//                 // Uncomment the following line if you want to add a search functionality
//                 // handleSearch={handleSearch}
//             />
//         ),
//         // Add additional options if needed
//     };
    

//     return (
//         <div>
//             <FilterDialog
//                 open={filterDialogOpen}
//                 onClose={() => setFilterDialogOpen(false)}
//                 onApply={(filter) => setSearchText(filter)}
//             />
//             <ColumnSelectionDialog
//                 open={columnDialogOpen}
//                 onClose={() => setColumnDialogOpen(false)}
//                 columns={selectedColumns}
//                 onApply={(visibleColumns) => {
//                     // Columns updated based on visibility
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
//                 options={options}
//             />
//         </div>
//     );
// };

// export default DocumentViewPending;


// working ----------------------

// import { ColumnFilterDialog } from '../../../../components/customIcons/ColumnFilterDialog'; // Make sure to import the ColumnFilterDialog component


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

// // CustomToolbar component
// const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
//     <div style={{ display: 'flex', gap: '8px' }}>
//         <Tooltip title="Filter" arrow>
//             <FilterListIcon onClick={handleFilter} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="View Columns" arrow>
//             <ViewColumnIcon onClick={handleViewColumns} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//         <Tooltip title="Download" arrow>
//             <CloudDownloadIcon onClick={handleDownload} style={{ cursor: 'pointer' }} />
//         </Tooltip>
//     </div>
// );

// // ColumnSelectionDialog component
// const ColumnSelectionDialog = ({ open, onClose, columns, onApply }) => {
//     const [selectedColumns, setSelectedColumns] = useState(columns);

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
//         // Add other columns as needed
//     ]);
//     const [filteredData, setFilteredData] = useState(hardCodedData);

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
//         <div>
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
//                     download: true,
//                     downloadOptions: {
//                         filename: 'MyPendingDocumentViewList.csv',
//                         separator: ',',
//                         filterOptions: {
//                             useDisplayedColumnsOnly: true,
//                             useDisplayedRowsOnly: true,
//                         },
//                     },
//                     onDownload: (buildHead, buildBody, columns, data) => `\uFEFF${buildHead(columns)}${buildBody(data)}`,
//                     selectableRows: 'none',
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





import queryString from 'query-string';

// Example data
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

const CustomToolbar = ({ handleFilter, handleViewColumns, handleDownload }) => (
    <div style={{ display: 'flex', gap: '8px' }}>
        <Tooltip title="Filter" arrow>
            <FilterListIcon  onClick={handleFilter} style={{ cursor: 'pointer'}} />
        </Tooltip>
        <Tooltip title="View Columns" arrow>
            <ViewColumnIcon onClick={handleViewColumns} style={{ cursor: 'pointer' }} />
        </Tooltip>
        <Tooltip title="Download" arrow>
            <CloudDownloadIcon onClick={handleDownload} style={{ cursor: 'pointer' }} />
        </Tooltip>
    </div>

//     <div style={{ display: 'flex', gap: '8px' }}>
//     <Tooltip title="Filter" arrow>
//         <span
//             role="img" // Add role attribute
//             aria-label="Filter" // Add aria-label as an alternative to alt
//             onClick={handleFilter}
//             style={{ cursor: 'pointer' }}
//         >
//             <FilterListIcon />
//         </span>
//     </Tooltip>
//     <Tooltip title="View Columns" arrow>
//         <span
//             role="img" // Add role attribute
//             aria-label="View Columns" // Add aria-label as an alternative to alt
//             onClick={handleViewColumns}
//             style={{ cursor: 'pointer' }}
//         >
//             <ViewColumnIcon />
//         </span>
//     </Tooltip>
//     <Tooltip title="Download" arrow>
//         <span
//             role="img" // Add role attribute
//             aria-label="Download" // Add aria-label as an alternative to alt
//             onClick={handleDownload}
//             style={{ cursor: 'pointer' }}
//         >
//             <CloudDownloadIcon />
//         </span>
//     </Tooltip>
// </div>


);

const ColumnFilterDialog = ({ open, onClose, onApply }) => {
    const [filters, setFilters] = useState({
        policyId: [],
        domainRisk: [],
        documentName: [],
    });

    useEffect(() => {
        // Set filters from URL
        const params = queryString.parse(window.location.search);

        const getValues = (param) => {
            if (Array.isArray(param)) {
                return param.flat().filter(Boolean);
            }
            return param ? param.split(',') : [];
        };

        setFilters({
            policyId: getValues(params.policyId),
            domainRisk: getValues(params.domainRisk),
            documentName: getValues(params.documentName),
        });
    }, [open]);

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
                {Object.keys(filters).map(columnId => (
                    <div key={columnId}>
                        <DialogTitle>{columnId.replace(/([A-Z])/g, ' $1')}</DialogTitle>
                        <Select
                            multiple
                            value={filters[columnId]}
                            onChange={(e) => handleFilterChange(columnId, e.target.value)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {/* Add your options here */}
                            {['Option 1', 'Option 2'].map(option => (
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

const ColumnSelectionDialog = ({ open, onClose, columns, onApply }) => {
    const [selectedColumns, setSelectedColumns] = useState(columns);

    useEffect(() => {
        // Set column visibility from URL
        const params = queryString.parse(window.location.search);

        const getVisibleColumns = (param) => {
            if (Array.isArray(param)) {
                return param.flat().filter(Boolean);
            }
            return param ? param.split(',') : [];
        };

        setSelectedColumns(prev =>
            prev.map(col => ({
                ...col,
                visible: getVisibleColumns(params.columns).includes(col.id),
            }))
        );
    }, [open]);

    const handleToggleColumn = (columnId) => {
        setSelectedColumns(prev =>
            prev.map(col =>
                col.id === columnId ? { ...col, visible: !col.visible } : col
            )
        );
    };

    const handleApply = () => {
        onApply(selectedColumns.filter(col => col.visible).map(col => col.id));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Choose Columns</DialogTitle>
            <DialogContent>
                {selectedColumns.map((col) => (
                    <FormControlLabel
                        key={col.id}
                        control={<Checkbox checked={col.visible} onChange={() => handleToggleColumn(col.id)} />}
                        label={col.name}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleApply}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
};

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
        // Add other columns as needed
    ]);
    const [filteredData, setFilteredData] = useState(hardCodedData);

    // Update URL based on filters and columns
    const updateURL = () => {
        const params = {
            policyId: columnFilters.policyId.join(','),
            domainRisk: columnFilters.domainRisk.join(','),
            documentName: columnFilters.documentName.join(','),
            columns: selectedColumns.filter(col => col.visible).map(col => col.id).join(','),
        };
        const queryStringified = queryString.stringify(params);
        window.history.replaceState(null, '', `?${queryStringified}`);
    };

    useEffect(() => {
        updateURL();
    }, [columnFilters, selectedColumns]);

    // Memoize the columns to avoid unnecessary re-renders
    const columns = useMemo(() =>
        selectedColumns
            .filter(col => col.visible)
            .map(col => ({
                name: col.id,
                label: col.name
            })),
        [selectedColumns]
    );

    // Handle filter application
    const applyFilters = (filters) => {
        const filtered = hardCodedData.filter(item =>
            Object.keys(filters).every(columnId =>
                filters[columnId].length === 0 || filters[columnId].includes(item[columnId])
            )
        );
        setFilteredData(filtered);
        setColumnFilters(filters);
    };

    const handleFilter = () => setFilterDialogOpen(true);

    const handleViewColumns = () => setColumnDialogOpen(true);

    const handleDownload = () => {
        console.log('Download icon clicked');
        const csvContent = [
            ['Policy ID', 'Domain Risk', 'Document Name'],
            ...filteredData.map(item => [
                item.policyId,
                item.domainRisk,
                item.documentName,
            ]),
        ]
            .map(e => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'MyPendingDocumentViewList.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <ColumnFilterDialog
                open={filterDialogOpen}
                onClose={() => setFilterDialogOpen(false)}
                onApply={applyFilters}
               
            />
            <ColumnSelectionDialog
                open={columnDialogOpen}
                onClose={() => setColumnDialogOpen(false)}
                columns={selectedColumns}
                onApply={(visibleColumns) => {
                    setSelectedColumns(prev =>
                        prev.map(col =>
                            visibleColumns.includes(col.id) ? { ...col, visible: true } : { ...col, visible: false }
                        )
                    );
                }}
            />
            <MUIDataTable
                title={'Pending Documents'}
                columns={columns}
                data={filteredData}
                options={{
                    filterType: 'multiselect',
                    fixedHeader: true,
                    responsive: 'standard',
                    download: true,
                    downloadOptions: {
                        filename: 'MyPendingDocumentViewList.csv',
                        separator: ',',
                        filterOptions: {
                            useDisplayedColumnsOnly: true,
                            useDisplayedRowsOnly: true,
                        },
                    },
                    onDownload: (buildHead, buildBody, columns, data) => `\uFEFF${buildHead(columns)}${buildBody(data)}`,
                    selectableRows: 'none',
                    customToolbar: () => (
                        <CustomToolbar
                            handleFilter={handleFilter}
                            handleViewColumns={handleViewColumns}
                            handleDownload={handleDownload}
                        />
                    ),
                }}
            />
        </div>
    );
};

export default DocumentViewPending;
