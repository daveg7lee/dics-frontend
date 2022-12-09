import Link from "next/link";
import AdminOnlyPage from "../../components/ProtectedPages/AdminOnlyPage";

const Upload = () => {
  return (
    <AdminOnlyPage>
      <div className="flex items-center justify-evenly min-h-screen pt-20">
        <Link href="/upload/merit">
          <h3 className="text-3xl font-bold">상점 입력</h3>
        </Link>
        <Link href="/upload/demerit">
          <h3 className="text-3xl font-bold">벌점 입력</h3>
        </Link>
      </div>
    </AdminOnlyPage>
  );
};

export default Upload;
