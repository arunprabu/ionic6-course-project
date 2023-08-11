import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styles: [`
    .m-20{
      margin: 20px 0;
    }
  `
  ]
})
export class ContactDetailsPage implements OnInit {
  name!: string;
  email!: string;
  phone!: string;
  contact: any;
  updateModalContact: any;

  @ViewChild(IonModal) updateModal: IonModal | undefined;

  constructor(private deleteAlertCtrl: AlertController, 
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService) { }

  ngOnInit() {
    // read the url param 
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    this.contactsService.getContactById(contactId)
      .subscribe((res: any) => {
        console.log(res);
        this.contact = res;
      });
  }

  // when update contact modal opens 
  handleModalOpen() {
    console.log('opened');
    // duplicating original contact when the update contact modal opens
    this.updateModalContact = {
      ...this.contact
    }
  }

  // for update contact modal
  handleUpdateWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'updateConfirm') {
      console.log(ev.detail.data);
      this.contactsService.updateContact(ev.detail.data)
        .subscribe((res: any) => {
          console.log(res);
          // TODO: show toast here
          this.contact = res;
        });
    }
  }

  // for update contact modal
  handleUpdateCancel() {
    this.updateModal?.dismiss(null, 'updateCancel');
  }

  // for update contact modal
  handleUpdateConfirm(){
    const updateableContact = {
      id: this.updateModalContact.id,
      name: this.updateModalContact.name,
      email: this.updateModalContact.email,
      phone: this.updateModalContact.phone,
    }
    this.updateModal?.dismiss(updateableContact, 'updateConfirm')
  }

  // for delete contact alert
  async handleDelete(){
    const deleteContactAlert = await this.deleteAlertCtrl.create({
      header: 'Are you sure?',
      message: 'This contact will be permanantly deleted. Okay?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            console.log('Confirmed');
          }
        },
      ]
    });
    await deleteContactAlert.present();
  }
}
