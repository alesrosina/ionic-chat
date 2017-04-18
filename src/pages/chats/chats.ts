import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {ChatPage} from "../chat/chat";
import { LoadingController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { AppSettingsService } from "../../app/app.settings.service";
import { Contacts, ContactFieldType, ContactFindOptions, Contact, ContactName, ContactField } from '@ionic-native/contacts';


/*
  Generated class for the Chats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  private settingsData:any;
  public allChats:any[];
  public chatPage = ChatPage;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private appPreferences: AppPreferences,
    public loadingCtrl: LoadingController,
    private appSettings: AppSettingsService,
    private contacts: Contacts
  ) {}

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Loading ...' });
    loading.present();
    this.platform.ready().then(() => {
      this.appPreferences.fetch('app', 'user').then((res) => {
        if (res) {
          this.settingsData = res;
          this.http.get(`${this.appSettings.serverUrl}users/${this.settingsData.id}/users`).map(res => res.json()).subscribe(data => {
            this.allChats = data;
          });
        }
        loading.dismiss();
      });
    });
  }

  public findContact(data:any) {
    let fields: ContactFieldType[] = ['phoneNumbers'];
    let returnContact:any = null;

    const options = new ContactFindOptions();
    if(data !== null) {
      options.filter = data.phone;
    }
    options.multiple = false;
    options.desiredFields = fields;

    this.contacts.find(fields, options).then((contacts) => {
      returnContact = contacts;
    });

    data.contact = returnContact;
    console.log(data.contact);

    return data;
  }
}
