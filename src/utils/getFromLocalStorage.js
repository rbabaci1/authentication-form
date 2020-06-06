const getFromLocalStorage = name => {
  const item = localStorage.getItem(name);

  if (item) return JSON.parse(item);

  localStorage.setItem(name, JSON.stringify(false));
  return false;
};

export default getFromLocalStorage;
