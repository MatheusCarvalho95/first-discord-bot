import axios from "axios";
import { gifUrl, jokeUrl, APEX_API_KEY, GIPHY_KEY } from ".";
import {
  apexMapRotation,
  apexNameToUid,
  apexPlayerStats,
  EAServerStatus,
} from "./urls";

const backTicks = "```";

export const getRandomImage = async (query) => {
  const { data } = await axios.get(
    gifUrl + `api_key=${GIPHY_KEY}&tag=${query}`,
  );
  return data.data.image_url;
};

export const getRandomJoke = async () => {
  const { data } = await axios.get(jokeUrl);
  return data;
};

export const getPlayerInfo = async (name: string) => {
  try {
    const { data } = await axios.get(
      apexPlayerStats + `&player=${name}` + `&auth=${APEX_API_KEY}`,
    );

    if (!data || data.error) {
      return `Ops, i could not find the player with name: ${name}`;
    }

    const { global } = data;

    const message = `${backTicks}json
  In game name: ${global.name} 
  Level: ${global.level}
  Is banned?: ${global.bans.isActive}
  Cooldown if banned: ${global.bans.remainingSeconds}
  Rank on Battle Royale: ${global.rank.rankName} ${global.rank.rankDiv}
  Rank on Arena: ${global.arena.rankName} ${global.arena.rankDiv}
  ${backTicks}
  `;
    return message;
  } catch (error) {
    console.log(error);
    return `Ops, the player ${name} never played Apex Legends before`;
  }
};

export const getMapRotation = async () => {
  const { data } = await axios.get(apexMapRotation + APEX_API_KEY);

  const message = `${backTicks}json
  Current Ranked: ${data.ranked.current.map} 
  Next on Ranked: ${data.ranked.next.map}
  Current BR: ${data.battle_royale.current.map}
  Next BR: ${data.battle_royale.next.map}
  Change in: ${data.battle_royale.current.remainingMins} minutes
  Current Arena: ${data.arenas.current.map}
  Next Arena: ${data.arenas.next.map}
  Change in: ${data.arenas.current.remainingMins} minutes
  Current Arena Ranked: ${data.arenasRanked.current.map}
  Next Arena: ${data.arenasRanked.next.map}
  Change in: ${data.arenasRanked.current.remainingMins} minutes
  ${backTicks}
  `;
  return message;
};

export const getServerStatus = async () => {
  const { data } = await axios.get(EAServerStatus + APEX_API_KEY);
  const message = `${backTicks}json
  Origin Login: ${data.Origin_login.SouthAmerica.Status} 
  EA Accounts: ${data.EA_accounts.SouthAmerica.Status}
  ApexOauth Crossplay: ${data.ApexOauth_Crossplay.SouthAmerica.Status}
  ${backTicks}
  `;
  return message;
};
