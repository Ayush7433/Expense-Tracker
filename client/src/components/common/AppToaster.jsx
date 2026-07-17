import { Toaster } from "sonner";
import { useSelector } from "react-redux";

const AppToaster = () => {
  const themeMode = useSelector((state) => state.theme.mode);

  return <Toaster position="bottom-right" richColors theme={themeMode} />;
};

export default AppToaster;