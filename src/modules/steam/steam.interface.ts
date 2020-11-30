export interface ISteamGame {
  name: string
  detailed_description: string
  about_the_game: string
  short_description: string
  header_image: string
  website: string
  background: string
}

export interface ISteamReview {
  recommendationId: number
  author: ISteamAuthor
  review: string
  timestamp_created: number
  timestamp_updated: number
  voted_up: boolean
  votes_up: number
  votes_funny: number
  weighted_vote_score: string
  comment_count: number
  steam_purchase: boolean
  received_for_free: boolean
  written_during_early_access: boolean
}

export interface ISteamAuthor {
  steamId: number
  num_games_owned: number
  num_reviews: number
  playtime_forever: number
  playtime_last_two_weeks: number
  last_played: number
}
