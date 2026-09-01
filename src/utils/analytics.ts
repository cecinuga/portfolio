/**
 * Firebase Analytics wiring (frontend-only: no backend, no auth).
 *
 * Config values come from `VITE_FIREBASE_*` env vars (see `.env.example`),
 * so the project identifiers stay out of the repo. They are still inlined
 * into the bundle at build time — Vite has no runtime env — but that is
 * fine: these are public web app identifiers (they identify the project,
 * they do not authorize anything). `measurementId` is what links this app
 * to its GA4 property; without it `getAnalytics` silently collects nothing.
 */
import { initializeApp } from 'firebase/app'
import {
  getAnalytics,
  isSupported,
  logEvent as firebaseLogEvent,
  setCurrentScreen,
  type Analytics,
} from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

/** A build without the env vars (fresh clone, no `.env`) simply runs untracked. */
const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.measurementId)

const app = configured ? initializeApp(firebaseConfig) : null

/**
 * Analytics needs browser APIs (cookies, IndexedDB) that aren't always
 * available (privacy modes, older browsers, SSR). Resolves to `null` when
 * unsupported so callers can no-op instead of throwing.
 */
const analyticsReady: Promise<Analytics | null> = !app
  ? Promise.resolve(null)
  : isSupported()
      .then((supported) => (supported ? getAnalytics(app) : null))
      .catch(() => null)

/** Logs a GA4 event. Fire-and-forget; safe to call before analytics resolves. */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  analyticsReady.then((analytics) => {
    if (analytics) firebaseLogEvent(analytics, name, params)
  })
}

/**
 * Records a virtual page view for a client-side route change. Firebase
 * only auto-logs the very first load, so SPA navigation needs this on
 * every route change (see `usePageTracking`).
 */
export function trackPageView(path: string, title?: string): void {
  analyticsReady.then((analytics) => {
    if (!analytics) return
    setCurrentScreen(analytics, path)
    firebaseLogEvent(analytics, 'page_view', {
      page_path: path,
      page_title: title ?? document.title,
      page_location: window.location.href,
    })
  })
}
