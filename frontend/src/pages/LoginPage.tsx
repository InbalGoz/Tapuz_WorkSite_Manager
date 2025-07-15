import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUserThunk } from "../features/auth/authSlice";

function LoginPage() {
  const dispatch = useAppDispatch();
  //const { status, error } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      //dispatch(restoreSession(token)); // תגדירי thunk שמביא את המשתמש מהשרת לפי הטוקן
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const action = await dispatch(loginUserThunk({ username, password }));

    if (loginUserThunk.fulfilled.match(action)) {
      const token = action.payload.token;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      //navigate("/dashboard");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>התחברות</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="שם משתמש"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה"
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        זכור אותי
      </label>
      <button type="submit" disabled={status === "loading"}>
        התחבר
      </button>
    </form>
  );
}

export default LoginPage;
