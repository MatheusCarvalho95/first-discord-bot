import axios from "axios";
import { gifUrl, jokeUrl } from ".";

export const getRandomImage = async () => {
  const { data } = await axios.get(gifUrl);
  return data.data.image_url;
};

export const getRandomJoke = async () => {
  const { data } = await axios.get(jokeUrl);
  return data;
};
