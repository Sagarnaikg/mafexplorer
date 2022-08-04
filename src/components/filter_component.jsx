import React, { useEffect, useState } from "react";
import { useStyletron } from "baseui";
import Filter from "baseui/icon/filter";
import { FormControl } from "baseui/form-control";
import { Button, SIZE } from "baseui/button";
import { Input } from "baseui/input";
import { Card, StyledBody } from "baseui/card";
import { Select } from "baseui/select";
import { Slider } from "baseui/slider";
import { StatefulPopover } from "baseui/popover";

let FilterPopover = ({
  setRows,
  allRows,
  variantTypeOptions,
  variantClassificationOptions,
  setPage,
}) => {
  const [css, theme] = useStyletron();
  const [geneName, setGeneName] = useState("");
  const [dbSnp, setDbSnp] = useState("");
  const [variantType, setVariantType] = useState([]);
  const [variantClassification, setVariantClassification] = useState([]);
  const [gnomRange, setGnomRange] = React.useState([0, 1]);

  // listen to geneName, variantType, variantClassification, dbSnp, gnomRange change
  // and update the table rows in real time
  useEffect(() => {
    setRows(
      allRows.filter(({ data }) => {
        if (geneName !== "") {
          let name = data[0];
          if (name.search(geneName) === -1) return false;
        }

        if (variantType.length) {
          let type = data[1];
          if (type !== variantType[0].label) return false;
        }

        if (variantClassification.length) {
          let clasi = data[2];
          if (clasi !== variantClassification[0].label) return false;
        }

        if (dbSnp !== "") {
          let id = data[4];
          if (id.search(dbSnp) === -1) return false;
        }

        let rangeValue = data[3];
        if (rangeValue < gnomRange[0] || rangeValue > gnomRange[1])
          return false;

        return true;
      })
    );
    setPage(1);
  }, [geneName, variantType, variantClassification, dbSnp, gnomRange]);

  let handleChange = (key, value) => {
    if (key === "Hugo_Symbol") {
      setGeneName(value);
    }
    if (key === "Variant_Type") {
      setVariantType(value);
    }
    if (key === "Variant_Classification") {
      setVariantClassification(value);
    }
    if (key === "gnomAD_AF_Range") {
      setGnomRange(value);
    }
    if (key === "dbSNP_RS") {
      setDbSnp(value);
    }
  };

  let popoverContent = () => {
    return (
      <Card style={{ padding: "10px", width: "300px" }}>
        <StyledBody>
          <FormControl label={() => "Hugo Symbol"}>
            <Input
              value={geneName}
              onChange={(e) =>
                handleChange("Hugo_Symbol", e.target.value.toLocaleUpperCase())
              }
              placeholder="ex:- MTOR"
              clearable
              size={SIZE.compact}
            />
          </FormControl>
          <FormControl label={() => "Variant Type"}>
            <Select
              deleteRemoves={false}
              size={SIZE.compact}
              options={variantTypeOptions}
              value={variantType}
              placeholder="Select Variant Type"
              onChange={(params) => handleChange("Variant_Type", params.value)}
            />
          </FormControl>
          <FormControl label={() => "Variant Classification"}>
            <Select
              deleteRemoves={false}
              size={SIZE.compact}
              options={variantClassificationOptions}
              value={variantClassification}
              placeholder="Select Variant Classification"
              onChange={(params) =>
                handleChange("Variant_Classification", params.value)
              }
            />
          </FormControl>
          <FormControl label={() => "GnomAD AF Range"}>
            <Slider
              min={0}
              max={1}
              step={0.000001}
              value={gnomRange}
              onChange={({ value }) =>
                gnomRange && handleChange("gnomAD_AF_Range", value)
              }
            />
          </FormControl>
          <FormControl label={() => "dbSNP RS"}>
            <Input
              value={dbSnp}
              onChange={(e) => handleChange("dbSNP_RS", e.target.value)}
              placeholder="ex:- rs4870"
              clearable
              size={SIZE.compact}
            />
          </FormControl>
        </StyledBody>
      </Card>
    );
  };

  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "space-between",
        paddingTop: theme.sizing.scale100,
      })}
    >
      <div className={css({ ...theme.typography.font400 })}></div>
      <StatefulPopover
        placement={"bottomRight"}
        content={popoverContent}
        accessibilityType={"Filter"}
      >
        <Button endEnhancer={() => <Filter size={18} />} size={SIZE.compact}>
          Filter
        </Button>
      </StatefulPopover>
    </div>
  );
};

export default FilterPopover;
