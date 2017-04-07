import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Contacts } from "@ionic-native/contacts";
import { AppPreferences } from '@ionic-native/app-preferences';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ChatsPage} from "../pages/chats/chats";
import {SettingsPage} from "../pages/settings/settings";
import {ChatPage} from "../pages/chat/chat";
import {AppSettingsService} from "./app.settings.service";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ChatsPage,
    ChatPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ChatsPage,
    ChatPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Contacts,
    AppPreferences,
    AppSettingsService
  ]
})
export class AppModule {}
