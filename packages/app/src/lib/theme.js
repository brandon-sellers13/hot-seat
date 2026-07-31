import { browser } from '$app/environment'

const KEY = 'hot-seat:theme'

/**
 * Three states, not two: 'light', 'dark', or null meaning "follow the system".
 * Following the system is the default and stays the default until somebody
 * actively chooses, because most people never touch a theme control and the
 * right answer for them is whatever their phone already decided.
 */
export const readTheme = () => {
  if (!browser) return null
  try {
    const saved = localStorage.getItem(KEY)
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch {
    return null
  }
}

export const applyTheme = (theme) => {
  if (!browser) return
  if (theme) {
    document.documentElement.dataset.theme = theme
  } else {
    delete document.documentElement.dataset.theme
  }
  try {
    if (theme) localStorage.setItem(KEY, theme)
    else localStorage.removeItem(KEY)
  } catch {
    // Private browsing. The choice applies for this session and is not kept.
  }
}

/** What the user would actually see right now, resolving "follow the system". */
export const resolvedTheme = (theme) => {
  if (theme) return theme
  if (!browser) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
