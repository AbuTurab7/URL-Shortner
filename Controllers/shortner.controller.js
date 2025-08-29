// import { saveToFile , getLinks , getShortLinks } from "../Modals/shortner.modal.js";
import { url_model } from "../schema/URL_schema.js";

export const getShortenURL = async (req, res) => {
  // const Links = await getLinks();
  const Links = await url_model.find();
  const isLoggedIn = req.cookies.isLoggedIn;
  res.render("index", { Links, host: req.host , isLoggedIn });
};

export const shortener = async (req, res) => {
  const { url , shortCode } = req.body;
//  const Links = await getLinks();

  const existing = await url_model.findOne({ shortCode });
if (existing) {
  return res.send(`
    <script>
      alert("Short code already exists. Try another one!");
      window.location.href = "/";
    </script>
  `);
}

  // if (Links[shortCode]) {
  //   return res.send(`
  //   <script>
  //     alert("Short code already exists. Try another one!");
  //     window.location.href = "/";
  //   </script>
  // `);
  // }

  // await saveToFile({ url, shortCode });
  await url_model.create({ url, shortCode });
  res.send(`
    <script>
      alert("URL shorten successfully!");
      window.location.href = "/";
    </script>
  `);
};


export const redirectURL = async (req, res) => {
  try {
    const { shortCode } = req.params;
    // const link = await getShortLinks(shortCode);
    const link = await url_model.findOne({shortCode : shortCode});
    if (!link) return res.redirect("/404");
    return res.redirect(link.url);
  } catch (error) {
    console.log(error);
  }
};
