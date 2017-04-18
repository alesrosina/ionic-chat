import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Contacts, ContactFieldType, ContactFindOptions, Contact, ContactName, ContactField } from '@ionic-native/contacts';
import { AlertController } from 'ionic-angular';
import {ChatPage} from "../chat/chat";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public allContacts: any[] = [];
  public chatPage = ChatPage;

  constructor(public navCtrl: NavController, private contacts: Contacts, public alertCtrl: AlertController) {

  }

  public ionViewDidLoad() {
    this.findContact(null);
  }

  public findContact(ev:any) {
    let fields: ContactFieldType[] = ['name', 'emails', 'phoneNumbers'];

    const options = new ContactFindOptions();
    if(ev !== null) {
      options.filter = ev.target.value;
    }
    options.multiple = true;
    options.desiredFields = fields;

    this.contacts.find(fields, options).then((contacts) => {
      this.allContacts = contacts;
    });

    if(this.allContacts.length == 0){
      this.allContacts.push({ name: { formatted: 'No Contacts found' } });
    }
  }

  public newContact() {
    // this.navCtrl.push(this.chatPage);
    this.showAlert('Not yet', 'This is not yet impemented.');
    // let contact: Contact = this.contacts.create();
    //
    // contact.name = new ContactName(null, 'Smith', 'John');
    // contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    // let contact = {name: {formatted: "Lojze Novak"}};
    // this.allContacts.push(contact);

    // contact.save().then(
    //   () => console.log('Contact saved!', contact),
    //   (error: any) => console.error('Error saving contact.', error)
    // );
  }

  public contactIsRegistered(item:any) {
    // let loading = this.loadingCtrl.create({ content: 'Loading ...' });
    // loading.present();
    // this.platform.ready().then(() => {
    //   this.appPreferences.fetch('app', 'user').then((res) => {
    //     if (res) {
    //       this.settingsData = res;
    //       this.http.get(`${this.appSettings.serverUrl}users/${this.settingsData.id}/users`).map(res => res.json()).subscribe(data => {
    //         this.allChats = data;
    //       });
    //     }
    //     loading.dismiss();
    //   });
    // });

    return false;
  }

  public startChat(contact:Contact) {
    let resp: string = '';

    for(let item of contact.phoneNumbers) {
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
