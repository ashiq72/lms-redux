import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import moment from "moment";
import type { TSemester } from "../../../types/courseManagement.type";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement";
export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  { label: "Upcoming", key: "UPCOMING" },
  { label: "Ongoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];

const RegistratedSemester = () => {
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const handleStatusDropdown = (data) => {
    console.log(data);
  };

  const menuProps = {
    items,
    onClick: handleStatusDropdown,
  };

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
      render: (item) => {
        let color;
        if (item == "UPCOMING") {
          color = "blue";
        }
        if (item == "ONGOING") {
          color = "green";
        }
        if (item == "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button>Hover</Button>
          </Dropdown>
        );
      },
    },
  ];

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
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
