import axios from "axios";

export default async (req, res) => {
  try {
    const imageResponse = await axios(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        },
      }
    );

    const {
      data: {
        result: { uploadURL },
      },
    } = imageResponse;

    res.status(200).json({ success: true, uploadURL });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
