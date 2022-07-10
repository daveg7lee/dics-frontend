import Loading from "./Loading";
import ProfileBox from "./ProfileBox";
import useUser from "../hooks/useUser";
import Head from "next/head";

const Profile = () => {
  const { data, loading } = useUser();
  return (
    <div className="min-h-screen layout flex items-center justify-center">
      <Head>
        <title>Profile | DICS 벌점 체크 시스템</title>
      </Head>
      {loading ? <Loading /> : <ProfileBox me={data?.me} />}
    </div>
  );
};

export default Profile;
