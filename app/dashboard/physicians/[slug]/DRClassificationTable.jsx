"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import useSWR from "swr";
import NextUITable from "@/app/components/tables/NextUITable";
import { columns, drClassificationRender } from "./drClassificationColumns";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DRClassificationTable = ({physician}) => {
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");

  const { data, isLoading } = useSWR(
    `/api/dr-classification/${physician}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  console.log(data);
  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = React.useMemo(() => {
    let filteredRows = [...(data?.rows || [])];

    return filteredRows;
  }, [data?.rows]);

  const pages = React.useMemo(() => {
    return data?.count ? Math.ceil(data.count / 10) : 0;
  }, [data?.count]);

  const rowCount = React.useMemo(() => {
    return data?.count ? data?.count : 0;
  }, [data?.count]);
  return (
    <Card className="mx-5">
      <CardBody>
        <NextUITable
          columns={columns}
          renderCell={drClassificationRender}
          isLoading={isLoading}
          page={page}
          pages={pages}
          setPage={setPage}
          rowCount={rowCount}
          filteredItems={filteredItems}
          hasSearchFilter={hasSearchFilter}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </CardBody>
    </Card>
  );
};

export default DRClassificationTable;
