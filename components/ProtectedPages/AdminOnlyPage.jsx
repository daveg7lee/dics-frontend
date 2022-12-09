import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";

export default function AdminOnlyPage({ children }) {
  const { loading, data } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (data?.me?.type !== "Admin") {
        router.push("/home");
      }
    }
  }, [loading, router, data?.me?.type]);

  return <>{children}</>;
}
