import { TweetResponse } from './tweet-response';

describe('TweetResponse', () => {
  it('should create an instance', () => {
    expect(new TweetResponse("","","","",[],[],0,0,false)).toBeTruthy();
  });
});
