import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {ChatsPage} from "../chats/chats";
import {SettingsPage} from "../settings/settings";
import { ModalController, ViewController, Platform } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ChatsPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = SettingsPage;

  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private appPreferences: AppPreferences
  ) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.appPreferences.fetch('app', 'user').then((res) => {
        if (!res) {
          let profileModal = this.modalCtrl.create(SettingsPage, { modal: true });
          profileModal.present();
        }
      });
    });


  }
}
