// This local publication does not generate social preview images.
export function getStaticPaths() {
  return []
}
export function GET() {
  return new Response(null, { status: 404 })
}
