import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YieldResult } from '../../models/yield.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private dataSource = new BehaviorSubject<YieldResult>({});  
  data$ = this.dataSource.asObservable();  

  public updateData(yieldResult: YieldResult) {
    this.dataSource.next(yieldResult); 
  }
}
