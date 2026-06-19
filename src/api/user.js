export const getStoredUser = () => ({
  nickname: localStorage.getItem("nickname") || "",
  honbabLevel: Number(localStorage.getItem("honbabLevel")) || 1,
});

export const saveUser = (user) => {
  if (!user) return;

  if (user.userId !== undefined) {
    localStorage.setItem("userId", user.userId);
  }
  if (user.nickname) {
    localStorage.setItem("nickname", user.nickname);
  }
  if (user.honbabLevel !== undefined) {
    localStorage.setItem("honbabLevel", user.honbabLevel);
  }
};

export const fetchMe = async (authToken) => {
  const token = authToken || localStorage.getItem("token");

  if (!token) {
    return getStoredUser();
  }

  const response = await fetch("/api/users/me", {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`[User] me fetch failed: ${response.status}`);
  }

  const result = await response.json();
  const user = result.data ?? result;
  saveUser(user);

  return user;
};
