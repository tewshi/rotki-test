// Utilities
import { createPinia } from "pinia";
import { mande } from "mande";

export const api = mande(`${import.meta.env.VITE_API_URL}`);
export default createPinia();
