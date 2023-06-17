import { useEffect } from "react";

const useDynamicTitle = (customTitle) => {
  useEffect(() => {
    document.title = customTitle;
  }, [customTitle]);
};

export default useDynamicTitle;
