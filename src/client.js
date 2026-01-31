import { createClient } from "@supabase/supabase-js";

const URL = "https://quospwjnymbbiqmtevku.supabase.co";
const API_KEY = "sb_publishable_Sz2cTVDUxvi3eQ9nFn-Njw_5vp0nGgE";

export const supabase = createClient(URL, API_KEY);