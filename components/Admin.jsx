import Link from "next/link";

const Admin = () => (
  <div className="flex flex-col justify-center items-center">
    <h1 className="text-7xl font-extrabold mb-10">Welcome!</h1>
    <div className="md:flex items-center w-full">
      <Link href="/upload">
        <a className="text-2xl font-semibold md:w-fit w-full">
          <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
            상벌점 입력
          </div>
        </a>
      </Link>
      <Link href="/searchUser">
        <a className="text-2xl font-semibold md:w-fit w-full">
          <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
            학생 조회
          </div>
        </a>
      </Link>
      <Link href="/signup">
        <a className="text-2xl font-semibold md:w-fit w-full">
          <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
            학생 추가
          </div>
        </a>
      </Link>
      <Link href="/deleteUser">
        <a className="text-2xl font-semibold md:w-fit w-full">
          <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
            학생 제거
          </div>
        </a>
      </Link>
      <Link href="/searchScore">
        <a className="text-2xl font-semibold md:w-fit w-full">
          <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
            상벌점 조회
          </div>
        </a>
      </Link>
    </div>
  </div>
);

export default Admin;
