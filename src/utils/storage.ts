const localStore = {
  save(key: string, value: any) {
    return localStorage.setItem(key, value);
  },

  get(key: string): any {
    return localStorage.getItem(key);
  },

  remove(key: string): any {
    return localStorage.removeItem(key);
  },
};

export default localStore;
