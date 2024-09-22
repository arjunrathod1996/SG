import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';


const TableComponent = ({ url, columnsConfigKey }) => {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetchData(url, {
        page: page - 1,
        size: perPage,
        query: filterText,
      });
      setData(response.content);
      setTotalRows(response.totalElements);
      setLoading(false);
    };
    getData();
  }, [url, page, perPage, filterText]);

  const columns = useMemo(() => columnsConfig[columnsConfigKey] || [], [columnsConfigKey]);

  const handleFilter = event => {
    setFilterText(event.target.value);
    setPage(1);
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'Rows per page',
    rangeSeparatorText: 'of',
    noRowsPerPage: false,
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={filterText}
        onChange={handleFilter}
      />
      <DataTable
        title="Data Table"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={newPerPage => setPerPage(newPerPage)}
        onChangePage={newPage => setPage(newPage)}
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default TableComponent;
