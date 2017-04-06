import { EtrPage } from './app.po';

describe('etr App', () => {
  let page: EtrPage;

  beforeEach(() => {
    page = new EtrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
