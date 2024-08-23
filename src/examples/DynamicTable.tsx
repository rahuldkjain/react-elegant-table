import React, { useState } from "react";
import Table from "../Table";
import { SortDetails } from "../base/Table/types";

const columns = [
  {
    header: "ID",
    width: "5%",
    accessorKey: "id",
    sticky: true,
  },
  {
    header: "Title",
    width: "15%",
    accessorKey: "title",
    sortable: true,
  },
  {
    header: "Description",
    accessorKey: "description",
    width: "75%",
  },
  {
    header: "Category",
    accessorKey: "category",
    width: "10%",
  },
];

const ITEMS_PER_PAGE = 3;
const DynamicTable = () => {
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tableMeta, setTableMeta] = useState<{
    heading: string;
    subheading: string;
  }>({
    heading: "Preview dynamic table",
    subheading: "preview dynamic table subtitle",
  });
  const fetchPosts = async (
    page: number,
    size: number,
    sortDetails?: SortDetails
  ) => {
    const sortKey = sortDetails?.sortKey ?? "";
    const sortOrder = sortDetails?.sortType ?? "";
    const data = await fetch(
      `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${
        ITEMS_PER_PAGE * (page - 1)
      }&sortKey=${sortKey}&sortOrder=${sortOrder}`
    );
    const newProducts = await data.json();
    setTotalPages(newProducts.total);
    return {
      list: newProducts.products,
      hasNextPage:
        newProducts.total > newProducts.products.length + newProducts.skip,
    };
  };

  return (
    <Table
      header={{
        title: tableMeta.heading,
        subtitle: tableMeta.subheading,
        infoText: "10 items",
        actions: <button>Add item</button>,
      }}
      actions={{
        onSearch: (event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        },
        onFilter: () => {
          console.log("Filter clicked");
        },
        otherActions: <button className="bg-white-400">action tab</button>,
      }}
      columns={columns}
      rowKey="id"
      fetchRows={fetchPosts}
      pagination={{
        pageSize: ITEMS_PER_PAGE,
        totalPageCount: totalPages,
      }}
      onInitialRowsFetched={() => {
        setTableMeta({
          heading: "Fetched table heading",
          subheading: "Fetched table subheading",
        });
      }}
      onRowClicked={(row: { [key: string]: any }) => {
        console.log("Row data: ", row);
      }}
      dependencies={[search]}
      placeholder="no posts found"
    />
  );
};

export default DynamicTable;
