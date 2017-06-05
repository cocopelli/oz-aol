import {browser, element, by} from 'protractor';

export class AOLPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root div')).getText();
  }
}
