const readings: Record<string, string> = {
  "1": "0.8 roentgen",
  "2": "3.6 roentgen",
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const reading = readings[id]

  if (!reading) {
    return new Response("Dosimeter reading not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  }

  return new Response(reading, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
