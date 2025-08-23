import { readFile, } from "fs/promises";
import { join } from "path";
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
  res.redirect("/");
};

export const getShortenURL = async (req, res) => {
  const filePath = join(import.meta.dirname, "../views", "index.html");
  const file = await readFile(filePath, "utf-8");
  const Links = await getLinks();

  const content = file.replace(
    "{{Shortened URL's}}",
    Object.entries(Links)
      .map(([code, url]) => {
        const newURL = url.length >= 40 ? url.slice(0, 40) + "..." : url;
        return `<li><a href="/${code}" target="_blank">${req.hostname}/${code}</a> <br> ${newURL}</li>`;
      })
      .join("")
  );
  res.send(content);
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
