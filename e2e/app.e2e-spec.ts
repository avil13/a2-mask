import { A2EmptyPage } from './app.po';

describe('a2-empty App', function() {
  let page: A2EmptyPage;

  beforeEach(() => {
    page = new A2EmptyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
