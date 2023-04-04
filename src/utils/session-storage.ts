class SessionStorage {
  static set(key: string, data: unknown): void {
    const dataStr = JSON.stringify(data);
    return sessionStorage.setItem(key, dataStr);
  }

  static get<T>(key: string): T | null {
    const dataStr = sessionStorage.getItem(key);
    return dataStr ? JSON.parse(dataStr) : null;
  }

  static remove(key: string): void {
    return sessionStorage.removeItem(key);
  }
}

export default SessionStorage;
