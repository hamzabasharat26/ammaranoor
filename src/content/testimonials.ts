import type { Testimonial } from './types'

// ---------------------------------------------------------------------------
// EMPTY BY DESIGN. Nothing goes in this array that Ammara did not receive.
//
// HARD RULE (CLAUDE.md §2): never write, paraphrase or "draft" a testimonial,
// not even marked as a placeholder — placeholder quotes get shipped by
// accident and a fabricated recommendation is unrecoverable.
//
// To add one: paste the recommendation verbatim, name the person, their title
// and organisation, the date it was given, and a `source` URL a reader can
// click to verify it. No source, no entry. While this array is empty the
// section does not render at all.
// ---------------------------------------------------------------------------

export const testimonials: Testimonial[] = []

export const hasTestimonials = testimonials.length > 0
