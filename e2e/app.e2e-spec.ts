import { PanelPage } from './app.po';

describe('panel App', function() {
  let page: PanelPage;

  beforeEach(() => {
    page = new PanelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
