import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Contacts, ContactFieldType, ContactFindOptions, Contact } from '@ionic-native/contacts';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public allContacts;

  constructor(public navCtrl: NavController, private contacts: Contacts, public alertCtrl: AlertController) {

  }

  public ionViewDidLoad() {
    this.contacts.find(['name', 'emails', 'phoneNumbers'], {multiple: true}).then((contacts) => {
      this.allContacts = contacts;
    });
  }

  public findContact(ev:any) {
    let fields: ContactFieldType[] = ['name', 'emails'];

    const options = new ContactFindOptions();
    options.filter = ev.target.value;
    options.multiple = true;
    options.hasPhoneNumber = true;

    this.contacts.find(fields, options).then((contacts) => {
      this.allContacts = contacts;
    });

    if(this.allContacts.length == 0){
      this.allContacts.push({displayName: 'No Contacts found'});
    }
  }

  public newContact() {
    this.showAlert('Not yet', 'This is not yet impemented.');
    // let contact: Contact = this.contacts.create();
    //
    // contact.name = new ContactName(null, 'Smith', 'John');
    // contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    // contact.save().then(
    //   () => console.log('Contact saved!', contact),
    //   (error: any) => console.error('Error saving contact.', error)
    // );
  }

  public startChat(contact:Contact) {
    let resp: string = '';

    for(let item of contact.emails) {
      resp += `${item.type} (${item.pref}): ${item.value}<br>`
    }

    this.showAlert('contact', resp);
  }

  private showAlert(title:string = '', content:string = '') {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }
}
