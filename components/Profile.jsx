import useUser from "../hooks/useUser";
import Admin from "./Admin";
import Student from "./Student";
import { Spinner } from "@chakra-ui/react";

const Profile = () => {
  const { data } = useUser();
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      {!data?.me ? (
        <Spinner />
      ) : (
        <div className="h-full w-full layout flex justify-center items-center py-20">
          {data?.me?.type === "Admin" ? <Admin /> : <Student me={data?.me} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
