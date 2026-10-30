import type { Job } from './data/experience'

type JobId = Job['id']

const EVENT = 'career:show-job'

/** Hash for a job on the career map, e.g. `#job-clinicorp` (also works as a shareable link). */
export const jobHash = (id: JobId) => `#job-${id}`

/** Ask the career map to open the job's act tab, scroll to it and highlight it. */
export function showJob(id: JobId) {
  window.history.replaceState(null, '', jobHash(id))
  window.dispatchEvent(new CustomEvent<JobId>(EVENT, { detail: id }))
}

/** Subscribe to `showJob` calls; also fires once for a `#job-…` hash on page load. Returns an unsubscribe. */
export function onShowJob(isJobId: (id: string) => id is JobId, callback: (id: JobId) => void) {
  const fromHash = window.location.hash.match(/^#job-(\w+)$/)?.[1]
  if (fromHash && isJobId(fromHash)) callback(fromHash)

  const listener = (event: Event) => callback((event as CustomEvent<JobId>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
