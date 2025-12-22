export const res = {
  json: function (data: Record<string, unknown>, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  },
}
