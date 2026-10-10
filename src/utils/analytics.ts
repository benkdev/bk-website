/**
 * Lightweight, privacy-conscious visitor analytics utility for Ben Krack Portfolio
 * Tracks page views, referrers, device categories, interaction events,
 * and seamlessly synchronizes with Google Analytics 4 (G-P7KCEWVGPZ).
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-P7KCEWVGPZ';

export interface AnalyticsEvent {
  eventType: 'pageview' | 'click' | 'interaction';
  path: string;
  referrer: string;
  timestamp: string;
  sessionId: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
  language: string;
  timeZone: string;
  metadata?: Record<string, string | number | boolean>;
}

// Session identifier persisted for the browser session
const getSessionId = (): string => {
  try {
    let sid = sessionStorage.getItem('bk_session_id');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('bk_session_id', sid);
    }
    return sid;
  } catch {
    return 'sess_fallback_' + Date.now();
  }
};

const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const saveLocalEvent = (event: AnalyticsEvent) => {
  try {
    const raw = localStorage.getItem('bk_recent_events');
    const existing: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    existing.push(event);
    // Keep last 50 events locally for debugging and client audits
    if (existing.length > 50) existing.shift();
    localStorage.setItem('bk_recent_events', JSON.stringify(existing));
  } catch {
    // Ignore storage quota errors
  }
};

/**
 * Tracks a pageview both locally and in Google Analytics 4
 */
export const trackPageView = (path: string, customTitle?: string) => {
  if (typeof window === 'undefined') return;

  const event: AnalyticsEvent = {
    eventType: 'pageview',
    path: path || window.location.pathname,
    referrer: document.referrer || 'Direct',
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    deviceType: getDeviceType(),
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || 'en',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    metadata: {
      title: customTitle || document.title,
    },
  };

  saveLocalEvent(event);

  // Forward SPA route navigation to Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: event.path,
      page_title: customTitle || document.title,
    });
  }

  // If a custom S3/API ingestion endpoint is configured, send the beacon
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  if (endpoint && navigator.sendBeacon) {
    try {
      const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    } catch {
      // Graceful fallback
    }
  }
};

/**
 * Tracks outbound clicks (e.g. LinkedIn, GitHub, Resume)
 */
export const trackOutboundClick = (label: string, destinationUrl: string) => {
  if (typeof window === 'undefined') return;

  const event: AnalyticsEvent = {
    eventType: 'click',
    path: window.location.pathname,
    referrer: document.referrer || 'Direct',
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    deviceType: getDeviceType(),
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || 'en',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    metadata: {
      label,
      destinationUrl,
    },
  };

  saveLocalEvent(event);

  // Forward outbound link event to Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: label,
      destination_url: destinationUrl,
    });
  }
};
