function generateId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}

export function getAnonUser() {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("anon_user");
  if (saved) return JSON.parse(saved);

  const id = generateId();

  const avatars = ["🐱","🐶","🦊","🐼","🐸","🐯","🐵"];
  const names = ["GoodBoy","KindSoul","BrightMind","PureHeart","WiseCat"];

  const user = {
    id,
    avatar: avatars[Math.floor(Math.random()*avatars.length)],
    name: names[Math.floor(Math.random()*names.length)] + "-" + id.slice(-4),
  };

  localStorage.setItem("anon_user", JSON.stringify(user));

  return user;
}