import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

interface UserProfile { username: string; email: string }

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then(res => setProfile(res.data))
        .catch(() => alert("Error fetching profile"));
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>User Profile</h2>
      {profile ? (
        <>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
