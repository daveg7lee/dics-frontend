import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";

export default function ProtectedPage({ children }) {
  const { loading, data } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!data?.me) {
        router.push("/");
      }
    }
  }, [loading, router, data?.me]);

  return <>{children}</>;
}
