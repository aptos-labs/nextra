import { Tweet as ReactTweet } from 'react-tweet'

export interface TweetProps {
  id: string
}

/**
 * @see https://react-tweet.vercel.app/
 */
export function Tweet({ id }: TweetProps) {
  return <ReactTweet id={id} />
}

export default Tweet
