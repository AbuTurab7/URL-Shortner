import { readFile, writeFile } from "fs/promises";
import { Router } from "express";
import { join } from "path";
const router = Router();

const Data_File = join(import.meta.dirname, "../Data", "links.json");

async function saveToFile(data) {
  await writeFile(Data_File, JSON.stringify(data, null, 2));
}

async function getLinks() {
  try {
    const Links = await readFile(Data_File, "utf-8");
    return JSON.parse(Links);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(Data_File, JSON.stringify({}));
      return {};
    }
    throw error;
  }
}


router.post("/shorten", async (req, res) => {
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
  `)
  res.redirect("/"); 
});


router.get("/", async (req, res) => {
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
});


router.get("/:code", async (req, res) => {
  const Links = await getLinks();
  const { code } = req.params;

  if (Links[code]) {
    res.redirect(Links[code]);
  } else {
    res.status(404).send("Short link not found!");
  }
});

export default router;