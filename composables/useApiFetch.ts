export function useApiFetch<T>(path: string, opts: any = {}) {
  // Всегда шлём cookies (для сессии)
  return $fetch<T>(path, {
    credentials: 'include',
    ...opts,
  })
}