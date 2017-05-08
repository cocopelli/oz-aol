import { AOLPage } from './app.po';

describe('aol App', () => {
  let page: AOLPage;

  beforeEach(() => {
    page = new AOLPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
