import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import multer from "multer";

const app = express();
const upload = multer();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.post("/proxy", upload.none(), async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzN0Bf54q9Nh8Jt2LLZiiayGjQWncc_7nLnR1aE-G5bxjwZ6Ha-ZFa2e1B5Ip3Y-jRA/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(req.body).toString()
    });

    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error occurred.");
  }
});

app.listen(PORT, () => {
  console.log(`CORS Proxy Server is running at http://localhost:${PORT}`);
});
