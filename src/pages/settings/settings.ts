import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { AppSettingsService } from "../../app/app.settings.service";

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public phoneNumber:string;
  public settingsData:any;
  public isModal:boolean = false;


  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private appPreferences: AppPreferences,
    public loadingCtrl: LoadingController,
    private appSettings: AppSettingsService,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.isModal = !!this.navParams.data.modal;
      this.appPreferences.fetch('app', 'user').then((res) => {
        if (res) {
          this.settingsData = res;
          this.phoneNumber = this.settingsData.phone;
        }
      });
    });
  }

  public deleteSettings() {
    this.settingsData = null;
    this.phoneNumber = null;
    this.appPreferences.remove('app', 'user');
  }

  public saveUser() {
    if(!this.phoneNumber) {
      console.log("phoneNumber is empty");
      return;
    }
    let loading = this.loadingCtrl.create({ content: 'Loading ...' });
    loading.present();

    this.http.get(`${this.appSettings.serverUrl}users/search?phone=${this.phoneNumber}`).map(res => res.json()).subscribe(data => {
      if(data == null) {
        let newUserData = { user: { phone: this.phoneNumber } };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("starting new user creation ...");
        this.http.post(`${this.appSettings.serverUrl}users`, newUserData, { headers: headers }).map(res => res.json()).subscribe(data => {
          this.appPreferences.store('app', 'user', data);
          this.settingsData = data;
        });
      }
      else {
        this.appPreferences.store('app', 'user', data);
        this.settingsData = data;
      }
      loading.dismiss();
      console.log(this.navParams.data);
      if(this.isModal) {
        this.viewCtrl.dismiss();
      }
    });
  }
}
