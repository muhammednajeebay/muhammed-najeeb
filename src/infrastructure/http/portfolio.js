export const fetchPortfolioContent = async () => {
  const res = await fetch("assets/content.json", {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`content.json ${res.status}`);
  }
  return res.json();
};
