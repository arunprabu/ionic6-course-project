import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { ToastController } from '@ionic/angular';
import { Contacts, PhoneType, EmailType } from '@capacitor-community/contacts';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  name = new FormControl('');
  email = new FormControl('');
  phone = new FormControl('');
  
  constructor(private contactsService: ContactsService, 
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  handleCreateContact() {
    const contact = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value
    }
    console.log(contact); // submittable form data
    // let's send the above to the REST API
    // https://jsonplaceholder.typicode.com/users
    this.contactsService.createContact(contact)
      .subscribe(async (res: any) => {
        console.log(res);
        if(res && res.id){
          // save the above contact in Mobile Device's Phone Book
          this.saveContactInPhonebook(res);
        }
      })
  }

  async saveContactInPhonebook(contactData: any){
    const res = await Contacts.createContact({
      contact: {
        name: {
          given: contactData.name,
          family: '',
        },
        phones: [
          {
            type: PhoneType.Mobile,
            label: 'mobile',
            number: contactData.phone,
          }
        ],
        emails: [
          {
            type: EmailType.Work,
            label: 'work',
            address: contactData.email,
          },
        ]
      },
    });

    console.log(res.contactId);

    // if success show the toast like following 
    // other show the error in toast
    const toast = await this.toastCtrl.create({
      message: 'Contact Saved!',
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  } 


}
