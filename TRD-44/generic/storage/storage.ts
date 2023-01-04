import { IdStorage } from './IdStorage';

class Storage {
  public getItem = <T extends string = string>(token: IdStorage) =>
    localStorage.getItem(token) as T | null;

  public setItem = <T extends string = string>(token: IdStorage, value: T) =>
    localStorage.setItem(token, value);

  public removeItem = (token: IdStorage) => localStorage.removeItem(token);
}

export const storage = new Storage();
