import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/proxy", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzN0Bf54q9Nh8Jt2LLZiiayGjQWncc_7nLnR1aE-G5bxjwZ6Ha-ZFa2e1B5Ip3Y-jRA/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(req.body).toString(),
    });

    const data = await response.text();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while forwarding the request.");
  }
});

app.listen(PORT, () => {
  console.log(`CORS Proxy Server is running at http://localhost:${PORT}`);
});
