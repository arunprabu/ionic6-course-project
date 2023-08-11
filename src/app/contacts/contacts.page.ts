import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts!: any[];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.getContacts();
  }

  handleRefresh(event: any){
    console.log(event);
    // this.getContacts();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  getContacts() {
    this.contactsService.getContacts()
      .subscribe((res: any[]) => {
        console.log(res);
        this.contacts = res;
        // return true;
      });
  }


}
