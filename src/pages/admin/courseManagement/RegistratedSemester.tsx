import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";

import type { TSemester } from "../../../types/courseManagement.type";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement";
export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const RegistratedSemester = () => {
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate,
      endDate,
      status,
    }),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default RegistratedSemester;
