import { useEffect } from "react";
import { useGlobalContext } from "../context";

const Alert = ({ type, msg, list }) => {
  const { hideAlert } = useGlobalContext();
  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};
export default Alert;
