/** @format */

const SUPABASE_URL = "https://dezsnyjjuofsiglcaxzu.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlenNueWpqdW9mc2lnbGNheHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwNjYyMzUsImV4cCI6MjA0MTY0MjIzNX0.qmQBqqd2G9S2PFmPpE9OjJegkCCgzpKa-UPlNCbsR6g";

import { createClient } from "../@supabase/supabase-js";
// import { showSucessAlert, showErrorAlert } from "../scripts/custom_alert";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
