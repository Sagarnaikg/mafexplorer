import React from "react";
import { StyledLink as Link } from "baseui/link";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";

let MAFTable = ({ window }) => {
  return (
    <TableBuilder
      style={{
        height: "71vh",
        margin: "15px 0px",
        border: "2px solid",
        borderColor: "rgba(188, 188, 188, 0.4)",
        borderRadius: "5px",
      }}
      data={window()}
    >
      {/* col 1 */}
      <TableBuilderColumn header="Hugo Symbol">
        {({ data }) => (
          <Link
            href={`http://www.google.com/search?q=${data[0]}`}
            target={"_blank"}
          >
            {data[0]}
          </Link>
        )}
      </TableBuilderColumn>
      {/* col 2 */}
      <TableBuilderColumn header="Variant Type">
        {({ data }) => data[1]}
      </TableBuilderColumn>
      {/* col 3 */}
      <TableBuilderColumn header="Variant Classification">
        {({ data }) => data[2]}
      </TableBuilderColumn>
      {/* col 4 */}
      <TableBuilderColumn header="dbSNP RS">
        {({ data }) => data[4]}
      </TableBuilderColumn>
      {/* col 5 */}
      <TableBuilderColumn header="gnomAD AF" numeric>
        {({ data }) => data[3]}
      </TableBuilderColumn>
    </TableBuilder>
  );
};

export default MAFTable;
