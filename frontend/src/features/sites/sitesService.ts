/*ביצוע בקשות לשרת*/
import axios from "axios";
import type { Site } from "../../models/site";
import devConfig from "../../env/dev";
import type { Res } from "../../models/res";

const BASE_URL = `${devConfig.base_url}/sites`;

export async function fetchAllSites(): Promise<Site[]> {
  const response: Res = await axios.get(`${BASE_URL}`);
  console.log(response.data);
  return response.data.success
    ? (response.data.data as Site[])
    : Promise.reject(response.data.error);
}
