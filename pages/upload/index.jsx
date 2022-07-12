import Link from "next/link";

const Upload = () => {
  return (
    <div className="flex items-center justify-evenly min-h-screen pt-20">
      <Link href="/upload/merit">
        <a className="text-3xl font-bold">상점 입력</a>
      </Link>
      <Link href="/upload/demerit">
        <a className="text-3xl font-bold">벌점 입력</a>
      </Link>
    </div>
  );
};

export default Upload;
