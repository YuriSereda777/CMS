import React, { useEffect, useState } from "react";
import useHTTP from "../../hooks/useHttp";
import Table from "../../components/Table";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const { isLoading, error, sendRequest: getCategories } = useHTTP();

  const sortHandler = (value) => {
    setSortBy(value);
  };

  useEffect(() => {
    getCategories(
      { url: "http://localhost:80/cms-api/getCategories.php" },
      (data) => {
        setCategories(
          data.map((element) => ({
            id: parseInt(element.id),
            name: element.name,
            number: parseInt(element.number),
          }))
        );
      }
    );
  }, [getCategories]);

  const table = [
    { colSize: 3, label: "ID", value: "id" },
    { colSize: 5, label: "Title", value: "name" },
    { colSize: 4, label: "Complaints", value: "number" },
  ];

  return (
    <Table
      title="Categories"
      table={table}
      elements={categories}
      pagination={false}
      isLoading={isLoading}
      error={error}
      search={false}
      filteredArray={categories}
      sortBy={sortBy}
      sortHandler={sortHandler}
    />
  );
};

export default Categories;
