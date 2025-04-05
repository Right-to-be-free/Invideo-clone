import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqymklojkbeknxedwvlg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeW1rbG9qa2Jla254ZWR3dmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4Nzk2MDksImV4cCI6MjA1OTQ1NTYwOX0.hukZ_noVMe3eEAUyWvkLvVgohxyIyo7SQRiVT-4FwJo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
