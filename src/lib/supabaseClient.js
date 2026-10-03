import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ktihjcuqvybztmezhadl.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_lqHGW4gIZTJSex4UsbnjXg_NkNmm-cs';

export const supabase = createClient(supabaseUrl, supabaseKey);

let authSettingsPromise;

export async function isAuthProviderEnabled(provider) {
	if (!authSettingsPromise) {
		authSettingsPromise = fetch(`${supabaseUrl}/auth/v1/settings`, {
			headers: { apikey: supabaseKey },
		})
			.then(async (response) => {
				if (!response.ok) throw new Error(`Could not check auth providers (${response.status}).`);
				return response.json();
			})
			.catch((error) => {
				authSettingsPromise = null;
				throw error;
			});
	}

	const settings = await authSettingsPromise;
	return Boolean(settings.external?.[provider]);
}
