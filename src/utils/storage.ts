interface ObjectStorage {
  removeItem(key: string): void;
  getItem(key: string): any | null;
  setItem(key: string, value: any): void;
}

declare global {
  interface Window {
    utools?: {
      dbStorage: ObjectStorage;
    };
  }
}

class LocalObjectStorage implements ObjectStorage {
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  getItem(key: string) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const storage = window.utools
  ? window.utools.dbStorage
  : new LocalObjectStorage();
