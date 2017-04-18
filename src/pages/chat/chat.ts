import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Contact } from '@ionic-native/contacts';
import { LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { AppPreferences } from '@ionic-native/app-preferences';
import { AppSettingsService } from "../../app/app.settings.service";


/*
  Generated class for the Chat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  public contact:any;
  public contactNumber:string;
  public messages:any = [];
  public message:string;
  private settingsData:any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public http: Http,
    private appPreferences: AppPreferences,
    private appSettings: AppSettingsService,
  ) {

  }

  ionViewDidLoad() {

    // this.contact = this.navParams.data.name.formatted;

    this.getMessages(true);

  }

  public isMyMessage(item:any) {
    if(item.sender.id == this.settingsData.id) {
      return true;
    }
    else {
      return false;
    }
  }

  public sendMessage() {
    let loading = this.loadingCtrl.create({ content: 'Loading ...' });
    loading.present();

    let messageData = { message: { content: this.message, sender_id: this.settingsData.id, receiver_id: this.contact.id } };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(`${this.appSettings.serverUrl}messages`, messageData, { headers: headers }).map(res => res.json()).subscribe(data => {
      this.getMessages(false);
      this.message = "";
      loading.dismiss();
    });
  }

  private getMessages(loading:boolean = false) {
    let loadingComp = this.loadingCtrl.create({content: 'Loading ...'});
    if(loading) {
      loadingComp.present();
    }
    this.platform.ready().then(() => {
      this.contact = this.navParams.data;
      this.contactNumber = this.contact.phone;
      this.appPreferences.fetch('app', 'user').then((res) => {
        if (res) {
          this.settingsData = res;
          this.http.get(`${this.appSettings.serverUrl}users/${this.settingsData.id}/messages/${this.contact.id}`).map(res => res.json()).subscribe(data => {
            this.messages = data;
          });
        }
        if(loading) {
          loadingComp.dismiss();
        }
      });
    });
  }
}
