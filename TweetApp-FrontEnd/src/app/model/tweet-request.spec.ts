import { TweetRequest } from './tweet-request';

describe('TweetRequest', () => {
  it('should create an instance', () => {
    expect(new TweetRequest("","")).toBeTruthy();
  });
});
