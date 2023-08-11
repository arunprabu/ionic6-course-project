import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // create contact 
  createContact(contact: any){
    console.log(contact);
    return this.http.post(this.apiUrl, contact)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  // list contacts 
  getContacts(){
    return this.http.get(this.apiUrl)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  // fetch contact details 
  getContactById(contactId: string | null){
    return this.http.get(`${this.apiUrl}/${contactId}`)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  // update contact
  updateContact(contact: any) {
    console.log(contact);
    return this.http.put(`${this.apiUrl}/${contact.id}`, contact)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  // TODO: delete contact
}
