import { config } from '../config'
import { fetchResume, type ParsedResume } from '../utils/resumeParser'
import { useAsync, type AsyncState } from './useAsync'

/** Loads and parses the Resume from the site root at runtime. */
export function useResume(): AsyncState<ParsedResume> {
  return useAsync(() => fetchResume(config.resume.path), config.resume.path)
}
