import dynamic from "next/dynamic";
import { useMemo } from "react";

const Admin = () => {
  const CMSPage = useMemo(
    () =>
      dynamic(() => import("../components/admin/"), {
        ssr: false,
      }),
    []
  );

  return useMemo(() => <CMSPage key="admin" />, [CMSPage]);
};

export default Admin;