const local = "GIT_HISTORY";

function limitRecents(storage) {}

function storeCoockie({ login, avatar_url, html_url }) {
  let storage = localStorage.getItem(local);
  if (!storage) storage = localStorage.setItem(local, `{}`);

  storage = localStorage.getItem(local);

  const mapStorage = JSON.parse(storage);

  mapStorage[`${login}`] = {
    html_url,
    login,
    avatar_url,
  };

  //if (Object.keys(mapStorage).length === 10) console.log("10");

  localStorage.setItem(local, JSON.stringify(mapStorage));
}

async function custonFetch(url) {
  const response = await fetch(url);
  const object = await response.json();

  return object;
}

async function gitService(login) {
  const [user, repos] = await Promise.all([
    custonFetch(`https://api.github.com/users/${login}`),
    custonFetch(`https://api.github.com/users/${login}/repos`),
  ]);
  storeCoockie(user);
  return { ...user, repos };
}

export default gitService;
