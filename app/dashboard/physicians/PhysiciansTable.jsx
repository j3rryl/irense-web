"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import useSWR from "swr";
import NextUITable from "@/app/components/tables/NextUITable";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { columns, physicianRender } from "./physicianColumns";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PhysiciansTable = () => {
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");

  const { data, isLoading } = useSWR(
    `/api/physicians?query=${filterValue}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
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
        <div className="flex justify-between items-center my-5">
          <span>Physicians</span>
          <Button color="primary" as={NextLink} href="/dashboard/physicians/add">
            Add Physician
          </Button>

        </div>
        <NextUITable
          columns={columns}
          renderCell={physicianRender}
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

export default PhysiciansTable;
