/*ביצוע בקשות לשרת*/
import axios from "axios";
import type { Site } from "../../models/site";
//import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/*function normalizeSite(raw: any): Site {
  return {
    id: raw.id,
    name: raw.name,
    address: raw.address,
    description: raw.description,
    imageUrl: raw.image_url,
    isFinished: raw.is_finished,
    createdAt: new Date(raw.created_at),
  };
}*/

//const BASE_URL = `${devConfig.base_url}/sites`;
const BASE_URL = "http://localhost:3000/sites";

export async function fetchAllSites(): Promise<Site[]> {
  const response: Res = await axios.get(`${BASE_URL}`);

  /*if (response.data.success) {
    const rawSites = response.data.data as Site[];
    const normalizedSites = rawSites.map(normalizeSite);
    return normalizedSites;
  } else {
    Promise.reject(response.data.error);
  }*/
  return response.data.success
    ? (response.data.data as Site[])
    : Promise.reject(response.data.error);
}
