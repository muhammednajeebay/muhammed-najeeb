const USERNAME = "muhammednajeeb.ay";
const RSS = `https://medium.com/feed/@${USERNAME}`;
const ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  RSS
)}`;

export const fetchMediumItems = async () => {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error(`medium ${res.status}`);
  }
  const payload = await res.json();
  return payload.items || [];
};
