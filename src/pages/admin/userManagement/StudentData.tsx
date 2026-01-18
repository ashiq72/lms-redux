import { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import type { TQueryParam } from "../../../types/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import type { TStudent } from "../../../types/userManagement.type";
export type TTableData = Pick<TStudent, "name" | "id">;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },

    {
      title: "Roll",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Details</Button>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery(params);
  console.log(studentData);

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default StudentData;
