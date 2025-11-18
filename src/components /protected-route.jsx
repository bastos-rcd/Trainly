import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userService";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const user = await getUser();
      if (!user) {
        navigate("/", { replace: true });
      } else {
        setUser(user);
      }
    }
    checkUser();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return children;
}
