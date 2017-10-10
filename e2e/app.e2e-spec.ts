import { GoogleMapPage } from './app.po';

describe('google-map App', () => {
  let page: GoogleMapPage;

  beforeEach(() => {
    page = new GoogleMapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
