const TTL = 10 * 60 * 1000;   // 10 phút

export async function loadRepos(user) {
  const cached = readCache(user);
  if (cached) return cached;
  const url = `https://api.github.com/users/mailinh21042005-rgb/repos?sort=updated&per_page=6`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('GitHub trả về ' + res.status);
  }
  const data = await res.json();
  const repos = data.map((r) => ({
    name: r.name,
    url: r.html_url,
    desc: r.description ?? 'Chưa có mô tả',
    stars: r.stargazers_count,
  }));
  writeCache(user, repos); 
  return repos;
}

function readCache(user) {
  const raw = localStorage.getItem('repos:' + user);
  if (!raw) return null;
  const { at, repos } = JSON.parse(raw);
  if (Date.now() - at > TTL) return null;
  return repos;
}

function writeCache(user, repos) {
  localStorage.setItem(
    'repos:' + user,
    JSON.stringify({ at: Date.now(), repos }),
  );
}