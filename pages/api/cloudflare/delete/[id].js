import axios from "axios";

export default async (req, res) => {
  try {
    const imageId = req.url.split("/")[4];
    await axios(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/${imageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
