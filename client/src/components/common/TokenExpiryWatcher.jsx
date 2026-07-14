import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { getTokenExpiryTime } from "../../utils/token";

const TokenExpiryWatcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    const expiryTime = getTokenExpiryTime(token);

    if (!expiryTime) {
      dispatch(logout());
      navigate("/login", { replace: true });
      return;
    }

    const timeLeft = expiryTime - Date.now();

    if (timeLeft <= 0) {
      dispatch(logout());
      navigate("/login", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
      navigate("/login", { replace: true });
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [token, dispatch, navigate]);

  return null;
};

export default TokenExpiryWatcher;
