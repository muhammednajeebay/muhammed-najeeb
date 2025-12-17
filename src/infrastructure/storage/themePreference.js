export const getThemePreference = () => {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
};

export const setThemePreference = (value) => {
  try {
    localStorage.setItem("theme", value);
  } catch {}
};
