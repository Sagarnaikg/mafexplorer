import React, { useState } from "react";
import { Block } from "baseui/block";
import { getData } from "../db/db";
import BottomPagination from "./pagination";
import MAFTable from "./custom_table";
import FilterPopover from "./filter_component";

const Table = () => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [variantTypeOptions, setVariantTypeOptions] = useState([]);
  const [variantClassificationOptions, setVariantClassificationOptions] =
    useState([]);
  const [allRows, setAllRows] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const getRows = (data) => {
    let vTypes = new Set(); // variant types
    let vCls = new Set(); // variant classifications

    const initialRows = data.map((r, i) => {
      // get different variant types from data
      if (!vTypes.has(r[1])) vTypes.add(r[1]);
      // get different variant classifications from data
      if (!vCls.has(r[2])) vCls.add(r[2]);
      return { id: i, data: r };
    });

    let temp = [];
    vTypes.forEach((type, i) => {
      temp.push({ label: type, id: `${i}` }); // set variant types
    });
    setVariantTypeOptions(temp);
    temp = [];
    vCls.forEach((option, i) => {
      temp.push({ label: option, id: `${i}` }); // set variant classifications
    });
    setVariantClassificationOptions(temp);
    setAllRows(initialRows);

    return initialRows; // return the rows back to table
  };

  useState(() => {
    let { data } = getData();
    if (data !== {}) {
      setRows(getRows(data));
      setData(data);
    }
  }, []);

  // table page number change handler
  const handlePageChange = (nextPage) => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(data.length / limit)) {
      return;
    }
    setPage(nextPage);
  };

  // table number of rows display handler
  const handleLimitChange = (nextLimit) => {
    const nextPageNum = Math.ceil(data.length / nextLimit);
    if (nextPageNum < page) {
      setLimit(nextLimit);
      setPage(nextPageNum);
    } else {
      setLimit(nextLimit);
    }
  };

  // get the rows per page
  const window = () => {
    const min = (page - 1) * limit;
    return rows.slice(min, min + limit);
  };

  return (
    /* cover */
    <Block
      width={"100%"}
      {...{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Inner component */}
      <Block
        marginTop={"15px"}
        height={"73vh"}
        maxWidth={"1300px"}
        width={"90%"}
      >
        {/* Filter Popover */}
        <FilterPopover
          allRows={allRows}
          setRows={setRows}
          setPage={setPage}
          variantTypeOptions={variantTypeOptions}
          variantClassificationOptions={variantClassificationOptions}
        />
        {/* table */}
        <MAFTable window={window} />
        {/* Page numbers */}
        <BottomPagination
          handleLimitChange={handleLimitChange}
          limit={limit}
          page={page}
          rows={rows}
          handlePageChange={handlePageChange}
        />
      </Block>
    </Block>
  );
};

export default Table;
