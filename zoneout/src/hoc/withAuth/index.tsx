import { handleLogout } from "@store/auth/action";
import { RootState } from "@store/index";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (Component: React.FC<any>) => {
  return function WithAuth(props: any) {
    const { isLogged, authUser } = useSelector((state: RootState) => state.auth);
    useLayoutEffect(() => {
      if (!isLogged && authUser === null) {
        handleLogout();
        return;
      }
    }, []);
    return <Component {...props} />;
  };
};

export default withAuth;
