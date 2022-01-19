import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  constructor() {}

  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  get(key: any): any {
    try {
      let item = localStorage.getItem(key);
      if (item != null) {
        return JSON.parse(item);
      } else throwError;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
