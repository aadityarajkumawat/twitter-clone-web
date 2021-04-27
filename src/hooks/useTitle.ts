import { useEffect } from "react";
import { useLocation } from "react-router";

export const useTitle = (title: string) => {
  const location = useLocation();
  useEffect(() => {
    console.log("cool");
    document.title = title;
  }, [location]);
};
