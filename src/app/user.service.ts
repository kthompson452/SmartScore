/* import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Bet } from './bets/bets.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users/';
 
  currentUser: AngularFireList<any> = null;
 
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.currentUser = db.list(this.dbPath);
  }


 
  createCustomer(customer: Customer): void {
    this.customersRef.push(customer);
  }
 
  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }
 
  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }
 
  getCustomersList(): AngularFireList<Customer> {
    return this.customersRef;
  }
 
  deleteAll(): Promise<void> {
    return this.customersRef.remove();
  }
}
 */