import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import SignIn from "../components/Auth/SignIn";
import Profile from "../components/Profile";

const Index = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="w-full px-8">{isLoggedIn ? <Profile /> : <SignIn />}</div>
  );
};

export default Index;
