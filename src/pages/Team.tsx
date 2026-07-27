import React, { useEffect, useState, useCallback } from 'react';
import {
  PenLine, Sparkles, Send, MessagesSquare, TrendingUp, Lock, RefreshCw,
  CheckCircle2, AlertCircle, Clock, ShieldAlert, PlayCircle, LogOut,
} from 'lucide-react';
import { useSEO } from '../components/SEO';

// ---------------------------------------------------------------------------
// Types (mirrors src/server/teamLogic.ts — kept as a separate, lighter copy
// here rather than importing server code into the client bundle).
// ---------------------------------------------------------------------------

type TeamRole = 'content_strategist' | 'copy_producer' | 'publisher' | 'community_rep' | 'growth_analyst';
type RunStatus = 'idle' | 'running' | 'done' | 'needs_approval' | 'needs_setup' | 'error';

interface RoleResult {
  role: TeamRole;
  status: Exclude<RunStatus, 'idle' | 'running'>;
  output: any;
  message?: string;
}

interface RoleCardState {
  status: RunStatus;
  output: any;
  message?: string;
}

const TEAM_KEY_STORAGE = 'mashnu_team_key';

const ROLE_META: Record<TeamRole, { label: string; mandate: string; icon: React.ElementType }> = {
  content_strategist: { label: 'AI Content Strategist', mandate: "Picks today's content idea from something real, not filler.", icon: PenLine },
  copy_producer: { label: 'AI Copy & Creative Producer', mandate: 'Writes platform-tuned captions for the idea above.', icon: Sparkles },
  publisher: { label: 'AI Publisher', mandate: 'The only role that touches a real platform API. Never posts without your approval.', icon: Send },
  community_rep: { label: 'AI Community Rep', mandate: 'Would watch inbound comments and DMs. Read-only, never cold outreach.', icon: MessagesSquare },
  growth_analyst: { label: 'AI Growth Analyst', mandate: 'Reads real signup data already captured by the site.', icon: TrendingUp },
};

const ROLE_ORDER: TeamRole[] = ['content_strategist', 'copy_producer', 'publisher', 'community_rep', 'growth_analyst'];

const STATUS_META: Record<RunStatus, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  idle: { label: 'Idle', color: 'var(--color-text-muted)', bg: 'var(--color-bg-subtle)', Icon: Clock },
  running: { label: 'Running…', color: 'var(--color-primary-accent)', bg: 'var(--color-primary-accent-light)', Icon: RefreshCw },
  done: { label: 'Done', color: 'var(--color-success)', bg: 'rgba(5, 150, 105, 0.08)', Icon: CheckCircle2 },
  needs_approval: { label: 'Needs approval', color: 'var(--color-warning)', bg: 'rgba(180, 83, 9, 0.08)', Icon: ShieldAlert },
  needs_setup: { label: 'Needs setup', color: 'var(--color-info)', bg: 'rgba(124, 58, 237, 0.08)', Icon: AlertCircle },
  error: { label: 'Error', color: 'var(--color-danger)', bg: 'rgba(220, 38, 38, 0.08)', Icon: AlertCircle },
};

function emptyRoleState(): Record<TeamRole, RoleCardState> {
  return ROLE_ORDER.reduce((acc, role) => {
    acc[role] = { status: 'idle', output: null };
    return acc;
  }, {} as Record<TeamRole, RoleCardState>);
}

export default function Team() {
  useSEO({
    title: 'AI Marketing Team | Mashnu AI',
    description: 'Internal pipeline for the Mashnu AI marketing team.',
    path: '/team',
    noindex: true,
  });

  // teamKey only ever gets set after the server has actually accepted it
  // (see verifyKey below) — never optimistically from sessionStorage, so a
  // stale or wrong passphrase can never render the dashboard even briefly.
  const [teamKey, setTeamKey] = useState<string | null>(null);
  const [checkingInitial, setCheckingInitial] = useState(true);
  const [keyInput, setKeyInput] = useState('');
  const [gateError, setGateError] = useState<string | null>(null);
  const [checkingGate, setCheckingGate] = useState(false);

  const [roleState, setRoleState] = useState<Record<TeamRole, RoleCardState>>(emptyRoleState);
  const [runningAll, setRunningAll] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);

  const callTeamApi = useCallback(
    async (body: any) => {
      const res = await fetch('/api/team/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-team-key': teamKey || '' },
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        sessionStorage.removeItem(TEAM_KEY_STORAGE);
        setTeamKey(null);
        throw new Error('Session expired. Please re-enter the passphrase.');
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Request failed.');
      return data as { runGroupId: string; results: RoleResult[] };
    },
    [teamKey]
  );

  const loadHistory = useCallback(async () => {
    if (!teamKey) return;
    try {
      const res = await fetch('/api/team/history', { headers: { 'x-team-key': teamKey } });
      if (!res.ok) return;
      const data = await res.json();
      setHistory(data.runs || []);
    } catch {
      // History is a nice-to-have; a failed fetch here shouldn't disturb the dashboard.
    }
  }, [teamKey]);

  // Checks a candidate passphrase against the server (the real auth
  // boundary) and loads history as a side effect of that same request.
  // Returns false for a wrong key; throws for a network/server problem, so
  // callers can tell "definitely wrong" apart from "couldn't check."
  const verifyKey = useCallback(async (key: string): Promise<boolean> => {
    const res = await fetch('/api/team/history', { headers: { 'x-team-key': key } });
    if (res.status === 401) return false;
    if (!res.ok) throw new Error('unreachable');
    const data = await res.json();
    setHistory(data.runs || []);
    return true;
  }, []);

  // On mount, verify whatever's in sessionStorage before ever unlocking the
  // dashboard — TEAM_ADMIN_KEY may have been rotated server-side since the
  // last visit, and trusting the stored value would flash real UI first.
  useEffect(() => {
    const stored = sessionStorage.getItem(TEAM_KEY_STORAGE);
    if (!stored) {
      setCheckingInitial(false);
      return;
    }
    verifyKey(stored)
      .then((ok) => {
        if (ok) {
          setTeamKey(stored);
        } else {
          sessionStorage.removeItem(TEAM_KEY_STORAGE);
          setGateError('That passphrase no longer works. Please re-enter it.');
        }
      })
      .catch(() => setGateError('Could not verify your session. Please re-enter the passphrase.'))
      .finally(() => setCheckingInitial(false));
  }, [verifyKey]);

  async function unlockGate(e: React.FormEvent) {
    e.preventDefault();
    const key = keyInput.trim();
    if (!key) return;

    setCheckingGate(true);
    setGateError(null);
    try {
      const ok = await verifyKey(key);
      if (ok) {
        sessionStorage.setItem(TEAM_KEY_STORAGE, key);
        setTeamKey(key);
      } else {
        setGateError('Incorrect passphrase.');
      }
    } catch {
      setGateError('Could not reach the server. Please try again.');
    } finally {
      setCheckingGate(false);
    }
  }

  function lockGate() {
    sessionStorage.removeItem(TEAM_KEY_STORAGE);
    setTeamKey(null);
    setRoleState(emptyRoleState());
  }

  function applyResult(result: RoleResult) {
    setRoleState((prev) => ({ ...prev, [result.role]: { status: result.status, output: result.output, message: result.message } }));
  }

  async function runOne(role: TeamRole, extra: Record<string, any> = {}) {
    setRoleState((prev) => ({ ...prev, [role]: { ...prev[role], status: 'running' } }));
    try {
      const data = await callTeamApi({ role, ...extra });
      data.results.forEach(applyResult);
      setLastRunAt(new Date().toISOString());
      loadHistory();
    } catch (err: any) {
      setRoleState((prev) => ({ ...prev, [role]: { ...prev[role], status: 'error', message: err.message } }));
    }
  }

  function handleRunClick(role: TeamRole) {
    if (role === 'copy_producer') {
      return runOne('copy_producer', { theme: roleState.content_strategist.output || undefined });
    }
    if (role === 'publisher') {
      return runOne('publisher', { drafts: roleState.copy_producer.output || undefined, approve: false });
    }
    return runOne(role);
  }

  async function approveAndPublish() {
    await runOne('publisher', { drafts: roleState.copy_producer.output, approve: true });
  }

  async function runAll() {
    setRunningAll(true);
    setRoleState((prev) => {
      const next = { ...prev };
      ROLE_ORDER.forEach((r) => (next[r] = { ...next[r], status: 'running' }));
      return next;
    });
    try {
      const data = await callTeamApi({ role: 'all', approve: false });
      data.results.forEach(applyResult);
      setLastRunAt(new Date().toISOString());
      loadHistory();
    } catch (err: any) {
      setRoleState((prev) => {
        const next = { ...prev };
        ROLE_ORDER.forEach((r) => (next[r] = { ...next[r], status: 'error', message: err.message }));
        return next;
      });
    } finally {
      setRunningAll(false);
    }
  }

  if (checkingInitial) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <RefreshCw className="w-5 h-5 text-[#94A3B8] animate-spin" />
      </div>
    );
  }

  if (!teamKey) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form onSubmit={unlockGate} className="w-full max-w-sm border border-[#E2E8F0] rounded-3xl bg-white p-8 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
            <Lock className="w-4.5 h-4.5 text-[#2563EB]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#0F172A]">AI Marketing Team</h1>
            <p className="text-sm text-[#64748B] mt-1">Internal tool. Enter the team passphrase to continue.</p>
          </div>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Passphrase"
            autoFocus
            className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
          />
          {gateError && <p className="text-xs text-[#DC2626]">{gateError}</p>}
          <button
            type="submit"
            disabled={checkingGate}
            className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1e40af] text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  const producerReady = roleState.copy_producer.status === 'needs_approval' && roleState.copy_producer.output;
  const growth = roleState.growth_analyst.status === 'done' ? roleState.growth_analyst.output : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">AI Marketing Team</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Five roles, one pipeline. Publisher never posts without your approval.
            {lastRunAt && <span className="font-mono text-xs ml-2 text-[#94A3B8]">Last run {new Date(lastRunAt).toLocaleTimeString()}</span>}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={runAll}
            disabled={runningAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1e40af] text-white text-xs font-semibold tracking-wide transition-colors disabled:opacity-60"
          >
            <PlayCircle className="w-4 h-4" />
            {runningAll ? 'Running all…' : 'Run All'}
          </button>
          <button onClick={lockGate} title="Lock" className="p-2.5 rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLE_ORDER.map((role) => {
          const meta = ROLE_META[role];
          const state = roleState[role];
          const statusMeta = STATUS_META[state.status];
          const Icon = meta.icon;
          const StatusIcon = statusMeta.Icon;

          return (
            <div key={role} className="border border-[#E2E8F0] rounded-3xl bg-white p-6 space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{meta.label}</h3>
                    <p className="text-xs text-[#64748B] mt-0.5 max-w-xs">{meta.mandate}</p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wide shrink-0"
                  style={{ color: statusMeta.color, background: statusMeta.bg }}
                >
                  <StatusIcon className={`w-3 h-3 ${state.status === 'running' ? 'animate-spin' : ''}`} />
                  {statusMeta.label}
                </span>
              </div>

              {state.message && <p className="text-xs text-[#64748B] bg-[#F8FAFC] rounded-xl px-3 py-2">{state.message}</p>}

              {role === 'content_strategist' && state.output && (
                <div className="text-xs text-[#334155] bg-[#F8FAFC] rounded-xl px-3 py-2.5 space-y-1">
                  <p className="font-mono text-[10px] text-[#94A3B8]">DAY {state.output.dayNumber} · {state.output.theme}</p>
                  <p>{state.output.angle}</p>
                </div>
              )}

              {role === 'copy_producer' && state.output && (
                <div className="text-xs text-[#334155] space-y-2">
                  <div className="bg-[#F8FAFC] rounded-xl px-3 py-2"><span className="font-mono text-[10px] text-[#94A3B8] block mb-1">LINKEDIN</span>{state.output.linkedin}</div>
                  <div className="bg-[#F8FAFC] rounded-xl px-3 py-2"><span className="font-mono text-[10px] text-[#94A3B8] block mb-1">X</span>{state.output.x}</div>
                  <div className="bg-[#F8FAFC] rounded-xl px-3 py-2"><span className="font-mono text-[10px] text-[#94A3B8] block mb-1">FACEBOOK</span>{state.output.facebook}</div>
                  <div className="bg-[#F8FAFC] rounded-xl px-3 py-2">
                    <span className="font-mono text-[10px] text-[#94A3B8] block mb-1">MEDIUM</span>
                    <span className="font-semibold block mb-0.5">{state.output.medium?.title}</span>
                    {state.output.medium?.content}
                  </div>
                </div>
              )}

              {role === 'publisher' && state.output?.attempts?.length > 0 && (
                <div className="space-y-1.5">
                  {state.output.attempts.map((a: any) => (
                    <div key={a.platform} className="flex items-center justify-between text-xs bg-[#F8FAFC] rounded-xl px-3 py-2">
                      <span className="font-mono uppercase text-[#334155]">{a.platform}</span>
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: a.status === 'posted' ? 'var(--color-success)' : a.status === 'needs_setup' ? 'var(--color-info)' : 'var(--color-danger)' }}
                      >
                        {a.status === 'posted' ? (a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer" className="underline">posted →</a> : 'posted') : a.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {role === 'growth_analyst' && growth && (
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-[#F8FAFC] rounded-xl py-3">
                    <p className="font-mono text-xl font-semibold text-[#0F172A]">{growth.totalLeads}</p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">total leads</p>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl py-3">
                    <p className="font-mono text-xl font-semibold text-[#0F172A]">{growth.leadsLast7Days}</p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">last 7 days</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleRunClick(role)}
                  disabled={state.status === 'running'}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] text-[#334155] text-xs font-semibold transition-colors disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${state.status === 'running' ? 'animate-spin' : ''}`} />
                  Run
                </button>
                {role === 'publisher' && producerReady && (
                  <button
                    onClick={approveAndPublish}
                    disabled={state.status === 'running'}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-colors disabled:opacity-60"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve &amp; Publish
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {history.length > 0 && (
        <div className="border border-[#E2E8F0] rounded-3xl bg-white p-6">
          <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Recent activity</h3>
          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {history.slice(0, 20).map((run) => {
              const s = STATUS_META[(run.status as RunStatus) || 'idle'];
              return (
                <div key={run.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#F1F5F9] last:border-0">
                  <span className="text-[#334155]">{ROLE_META[run.role as TeamRole]?.label || run.role}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px]" style={{ color: s.color }}>{s.label}</span>
                    <span className="font-mono text-[10px] text-[#94A3B8]">{new Date(run.created_at).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
