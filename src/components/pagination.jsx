import React from "react";
import { Pagination } from "baseui/pagination";
import { Block } from "baseui/block";
import { Button, KIND } from "baseui/button";
import TriangleDown from "baseui/icon/triangle-down";
import { StatefulMenu } from "baseui/menu";
import { StatefulPopover, PLACEMENT } from "baseui/popover";

let BottomPagination = ({
  handleLimitChange,
  limit,
  page,
  rows,
  handlePageChange,
}) => {
  return (
    <Block
      {...{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "5px",
        font: "10px",
      }}
      flexDirection={["column", "column", "row"]}
    >
      {/* number of rows selector */}
      <StatefulPopover
        content={({ close }) => (
          <StatefulMenu
            items={Array.from({ length: 49 }, (_, i) => ({
              label: i + 10,
            }))}
            onItemSelect={({ item }) => {
              handleLimitChange(item.label);
              close();
            }}
            overrides={{
              List: {
                style: { height: "150px", width: "100px" },
              },
            }}
          />
        )}
        placement={PLACEMENT.bottom}
      >
        <Button kind={KIND.tertiary} endEnhancer={TriangleDown}>
          {`${limit} Rows`}
        </Button>
      </StatefulPopover>
      {/* page numbers */}
      <Pagination
        currentPage={page}
        numPages={Math.ceil(rows.length / limit)}
        onPageChange={({ nextPage }) => handlePageChange(nextPage)}
      />
    </Block>
  );
};

export default BottomPagination;
