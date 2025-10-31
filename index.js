const express = require("express")
const cors = require("cors")
const { RtcTokenBuilder, RtcRole } = require("agora-access-token")

const app = express()
app.use(cors())

const AGORA_APP_ID = "b0e96e3a2fd148239250e5155c067725"
const AGORA_APP_CERTIFICATE = "85a0b89e1e604ea5a9f36a816d821693"


app.get("/token", (req, res) => {
  const channelName = req.query.channel
  const uid = req.query.uid || 0
  if (!channelName) return res.status(400).json({ error: "Channel name required" })

  const role = RtcRole.PUBLISHER
  const expireTime = 60 * 30
  const currentTime = Math.floor(Date.now() / 1000)
  const privilegeExpiredTs = currentTime + expireTime

  const token = RtcTokenBuilder.buildTokenWithUid(
    AGORA_APP_ID,
    AGORA_APP_CERTIFICATE,
    channelName,
    Number(uid),
    role,
    privilegeExpiredTs
  )

  res.json({ token })
})

app.listen(3000, () => console.log("Agora Token Server running on http://localhost:3000"))
