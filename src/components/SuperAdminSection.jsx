import React, { useEffect, useState } from 'react';
import { Activity, AlertCircle, CheckCircle2, Database, Download, HardDrive, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const EMPTY_DASHBOARD = { stats: null, users: [], recentDownloads: [] };

function formatDate(value) {
  if (!value) return 'Never';
  return new Date(value).toLocaleString();
}

function SuperAdminSection({ activeSection }) {
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    if (activeSection === 'super-admin') setSearch('');
  }, [activeSection]);

  useEffect(() => {
    if (activeSection !== 'super-admin') return undefined;

    let cancelled = false;
    setIsLoading(true);
    setErrorMessage('');

    supabase.rpc('admin_dashboard')
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) throw error;
        if (!data?.stats || !Array.isArray(data.users) || !Array.isArray(data.recentDownloads)) {
          throw new Error('Admin data returned an invalid response. Run the latest supabase-schema.sql.');
        }
        setDashboard(data);
      })
      .catch((error) => {
        if (!cancelled) {
          setErrorMessage(error?.message || 'Could not load admin data.');
          setDashboard(EMPTY_DASHBOARD);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [activeSection, refreshTick]);

  const visibleUsers = dashboard.users.filter((user) => (
    user.email.toLowerCase().includes(search.trim().toLowerCase())
  ));

  return (
    <section id="admin-super-admin" className={`section super-admin-section ${activeSection === 'super-admin' ? 'active' : 'hidden'}`}>
      <header className="super-admin-header">
        <div>
          <span className="super-admin-eyebrow"><ShieldCheck size={15} /> Private administration</span>
          <h1>Super Admin</h1>
          <p>AI Fashion Design backend, database activity, and user access.</p>
        </div>
        <button type="button" className="super-admin-refresh" onClick={() => setRefreshTick((tick) => tick + 1)} disabled={isLoading}>
          <RefreshCw size={16} className={isLoading ? 'super-admin-spinning' : ''} />
          Refresh data
        </button>
      </header>

      {errorMessage && (
        <div className="super-admin-notice" role="alert">
          <AlertCircle size={18} />
          <div><strong>Admin data unavailable</strong><span>{errorMessage}. Run the updated supabase-schema.sql once in your Supabase SQL Editor, then refresh this page.</span></div>
        </div>
      )}

      <div className="super-admin-stats">
        <article className="super-admin-stat"><Users size={20} /><span>Registered users</span><strong>{dashboard.stats?.registeredUsers ?? (isLoading ? '...' : '--')}</strong></article>
        <article className="super-admin-stat"><Database size={20} /><span>Published designs</span><strong>{dashboard.stats?.publishedDesigns ?? (isLoading ? '...' : '--')}</strong></article>
        <article className="super-admin-stat"><Download size={20} /><span>Tracked design downloads</span><strong>{dashboard.stats?.designDownloads ?? (isLoading ? '...' : '--')}</strong></article>
        <article className="super-admin-stat"><Activity size={20} /><span>Last data refresh</span><strong className="super-admin-stat-date">{dashboard.generatedAt ? formatDate(dashboard.generatedAt) : '--'}</strong></article>
      </div>

      <section className="super-admin-panel">
        <div className="super-admin-panel-heading">
          <div><Users size={18} /><h2>Registered accounts</h2><span>{dashboard.stats?.registeredUsers ?? (isLoading ? '...' : '--')}</span></div>
          <input
            type="search"
            name="admin-account-email-filter"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            readOnly
            onFocus={(event) => event.target.removeAttribute('readonly')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Filter by email"
            aria-label="Filter users by email"
          />
        </div>
        <p className="super-admin-table-note">Supabase Auth accounts and their last sign-in are listed here. Demo sessions are not registered accounts.</p>
        <div className="super-admin-table-wrap">
          <table className="super-admin-table">
            <thead><tr><th>Email</th><th>Provider</th><th>Status</th><th>Joined</th><th>Last sign-in</th></tr></thead>
            <tbody>
              {visibleUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td className="super-admin-provider">{user.provider}</td>
                  <td><span className={`super-admin-status ${user.emailConfirmed ? 'confirmed' : 'pending'}`}>{user.emailConfirmed ? 'Confirmed' : 'Unconfirmed'}</span></td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.lastSignInAt)}</td>
                </tr>
              ))}
              {!isLoading && visibleUsers.length === 0 && <tr><td colSpan="5" className="super-admin-empty">{errorMessage ? 'Account data could not be loaded.' : search.trim() ? 'No accounts match this email.' : dashboard.stats ? 'No Supabase Auth accounts were found. Demo sessions do not appear here.' : 'Account data is not loaded yet.'}</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <div className="super-admin-lower-grid">
        <section className="super-admin-panel">
          <div className="super-admin-panel-heading"><div><Download size={18} /><h2>Recent design downloads</h2></div></div>
          <div className="super-admin-download-list">
            {dashboard.recentDownloads.map((download) => (
              <div className="super-admin-download-row" key={download.id}>
                <div><strong>{download.designTitle}</strong><span>{download.email}</span></div>
                <time>{formatDate(download.createdAt)}</time>
              </div>
            ))}
            {!isLoading && dashboard.recentDownloads.length === 0 && <p className="super-admin-empty">No tracked downloads yet. Only completed, signed-in profile downloads are counted.</p>}
          </div>
        </section>

        <section className="super-admin-panel super-admin-system-panel">
          <div className="super-admin-panel-heading"><div><HardDrive size={18} /><h2>Backend &amp; database</h2></div></div>
          <dl className="super-admin-system-list">
            <div><dt>Authentication</dt><dd>Supabase Auth · Google OAuth + email/password</dd></div>
            <div><dt>Database</dt><dd>Supabase Postgres · browser data uses the Supabase Data API</dd></div>
            <div><dt>Admin API</dt><dd>Postgres SECURITY DEFINER RPC · verified JWT email allowlist, authenticated execution only</dd></div>
            <div><dt>posts table</dt><dd>Design title, category, price, description, image URLs, author, stock, and creation time. Public read/upload policies currently support the public gallery.</dd></div>
            <div><dt>download_events</dt><dd>Signed-in user ID, design ID/title, and download timestamp. RLS restricts inserts to the signed-in user's own ID.</dd></div>
            <div><dt>Image storage</dt><dd>fashion-posts bucket · public image URLs are used for gallery posts.</dd></div>
            <div><dt>App installs</dt><dd>Not tracked. Browser visits do not prove an app was installed.</dd></div>
          </dl>
        </section>
      </div>
    </section>
  );
}

export default SuperAdminSection;
