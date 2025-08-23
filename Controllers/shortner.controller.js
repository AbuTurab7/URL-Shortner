import { saveToFile } from "../Modals/shortner.modal.js";
import { getLinks } from "../Modals/shortner.modal.js";

export const shortener = async (req, res) => {
  const Links = await getLinks();
  const { code, url } = req.body;

  if (Links[code]) {
    return res.send(`
    <script>
      alert("Short code already exists. Try another one!");
      window.location.href = "/";
    </script>
  `);
  }

  Links[code] = url;
  await saveToFile(Links);
  res.send(`
    <script>
      alert("URL shorten successfully!");
      window.location.href = "/";
    </script>
  `);
};

export const getShortenURL = async (req, res) => {
  const Links = await getLinks();
res.render("index" ,  { Links , host : req.host } );
};



export const redirectURL = async (req, res) => {
  const Links = await getLinks();
  const { code } = req.params;

  if (Links[code]) {
    res.redirect(Links[code]);
  } else {
    res.status(404).send("Short link not found!");
  }
};
