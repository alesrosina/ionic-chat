import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {ChatsPage} from "../chats/chats";
import {SettingsPage} from "../settings/settings";

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

  constructor() {

  }
}
