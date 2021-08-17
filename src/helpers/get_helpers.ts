import axios from "axios";
import { gifUrl, jokeUrl, jokeUrlByType } from ".";
import * as dotenv from "dotenv";
dotenv.config();
export const getRandomImage = async (query) => {
  const { data } = await axios.get(
    gifUrl + `api_key=${process.env.GIPHY_KEY}&tag=${query}`,
  );
  return data.data.image_url;
};

export const getRandomJoke = async () => {
  const { data } = await axios.get(jokeUrl);
  return data;
};
