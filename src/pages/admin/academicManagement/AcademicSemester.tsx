import { useGetAllSemestersQuery } from "../../../redux/features/acdemicSemester/academicSemesterAPI";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  return <div>Academic Semester Management Page</div>;
};
export default AcademicSemester;
