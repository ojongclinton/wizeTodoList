export function setLocalStorageWithExpiry(
  key: string,
  value: any,
  ttl: number
) {
  const now = new Date();
  const existingItem = localStorage.getItem(key);
  if (existingItem) {
    const parsedItem = JSON.parse(existingItem);
    if (parsedItem.expiry > now.getTime()) {
      return;
    }
  }
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
