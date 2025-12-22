import { res } from "../utils"

export async function handleHealth() {
  return res.json({ status: "ok" })
}
