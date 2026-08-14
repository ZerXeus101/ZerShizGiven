import { useStorage } from '@vueuse/core'

export const useSettings = () => {
  // We use useStorage to automatically persist to localStorage.
  // The second argument is the default value.
  const animationsEnabled = useStorage('zershiz-animations-enabled', true)
  const smoothScrollEnabled = useStorage('zershiz-smoothscroll-enabled', true)

  return {
    animationsEnabled,
    smoothScrollEnabled
  }
}
