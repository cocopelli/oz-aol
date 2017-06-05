import {AOLPage} from './app.po';

describe('AND ONE Lyrics App', () => {
  let page: AOLPage;

  beforeEach(() => {
    page = new AOLPage();
  });

  it('should display message saying "A O L"', async () => {
    page.navigateTo();
    expect<any>(await page.getParagraphText()).toEqual('A O L');
  });
});
