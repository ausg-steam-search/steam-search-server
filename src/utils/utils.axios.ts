import _axios from 'axios'

const STEAM_REVIEW_API = `https://store.steampowered.com/appreviews`

export const steamReviewAxios = _axios.create({
  baseURL: STEAM_REVIEW_API,
})
