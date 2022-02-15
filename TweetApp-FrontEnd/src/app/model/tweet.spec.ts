import { Tweet } from './tweet';

describe('Tweet', () => {
  it('should create an instance', () => {
    expect(new Tweet("","","","",[],[],0,0,false)).toBeTruthy();
  });
});
