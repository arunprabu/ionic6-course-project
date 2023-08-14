import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts!: any[];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    // this.getContacts();
    this.retrieveListOfContacts();
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

  async retrieveListOfContacts(){
    const projection = {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
      emails: true
    };

    const result = await Contacts.getContacts({
      projection,
    });

    this.contacts = result.contacts;
  };

}
