/**
 * Firebase Analytics wiring (frontend-only: no backend, no auth).
 *
 * Config values below are the public web app identifiers for this Firebase
 * project (safe to ship client-side — they identify the project, they do
 * not authorize anything). `measurementId` is what links this app to its
 * GA4 property; without it `getAnalytics` silently collects nothing.
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
  apiKey: 'AIzaSyA0RBkzzL0UPctbcknlotBSo_9T9siFMB4',
  authDomain: 'matteo-marchetti-portfolio.firebaseapp.com',
  projectId: 'matteo-marchetti-portfolio',
  storageBucket: 'matteo-marchetti-portfolio.firebasestorage.app',
  messagingSenderId: '346828869106',
  appId: '1:346828869106:web:6bcf75c159c44066372f6b',
  measurementId: 'G-0QMX62DGQC',
}

const app = initializeApp(firebaseConfig)

/**
 * Analytics needs browser APIs (cookies, IndexedDB) that aren't always
 * available (privacy modes, older browsers, SSR). Resolves to `null` when
 * unsupported so callers can no-op instead of throwing.
 */
const analyticsReady: Promise<Analytics | null> = isSupported()
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
