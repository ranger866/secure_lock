// Konfigurasi Supabase
const SB_URL = "https://gncsxrspqxlcozseehsh.supabase.co/rest/v1/";
const SB_KEY = "sb_publishable_sUAuBgvsrHm6K7cY1da-Jw_osjp1erO";

// Header Request Ajax
const SB_HEADERS = {
    "apikey": SB_KEY,
    "Authorization": `Bearer ${SB_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
};

