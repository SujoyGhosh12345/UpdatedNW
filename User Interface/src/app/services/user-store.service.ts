import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$=new BehaviorSubject<string>("");

  constructor() { }

  public getfullNameFromStore(){
    return this.fullName$.asObservable();
  }
  public setfullNameForStore(fullname:string){
    return this.fullName$.next(fullname);
  }
}

