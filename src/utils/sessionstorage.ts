class SessionStorage {
  set(key: string, data: unknown): void {
    const dataStr = JSON.stringify(data);
    return sessionStorage.setItem(key, dataStr);
  }

  get<T>(key: string): T | null {
    const dataStr = sessionStorage.getItem(key);
    return dataStr ? JSON.parse(dataStr) : null;
  }

  remove(key: string): void {
    return sessionStorage.removeItem(key);
  }
}

const instance = new SessionStorage();

export default instance;
