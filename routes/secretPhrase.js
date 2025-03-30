const express = require("express");
const bcrypt = require("bcrypt");
const SecretPhrase = require("../models/SecretPhrase");
const router = express.Router();

router.post("/store-phrase", async (req, res) => {
  try {
    const { userId, mnemonic } = req.body;
    const saltRounds = 10;

    const hashedPhrase = await bcrypt.hash(mnemonic, saltRounds);

    const wordsArray = mnemonic.split(" ").map((word, index) => ({
      position: index + 1,
      word,
    }));

    const secretPhrase = new SecretPhrase({
      userId,
      encryptedPhrase: hashedPhrase,
      words: wordsArray,
    });

    await secretPhrase.save();
    res.status(201).json({ message: "Secret phrase stored successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
