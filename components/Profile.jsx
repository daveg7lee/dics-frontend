import Loading from "./Loading";
import ProfileBox from "./ProfileBox";
import useUser from "../hooks/useUser";

const Profile = () => {
  const { data, loading } = useUser();
  return (
    <div className="min-h-screen layout flex items-center justify-center">
      {loading ? <Loading /> : <ProfileBox me={data?.me} />}
    </div>
  );
};

export default Profile;
