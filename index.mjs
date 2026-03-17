import express from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar system";
    let response = await fetch(url);
    let data = await response.json();

    let rand = Math.floor(Math.random() * 40) + 1;

    let img = data['hits'][rand]['webformatURL'];
    res.render('home.ejs', {img})
});

app.get('/mercury', (req, res) => {
    let mercury = planets.getMercury();
    res.render('mercury.ejs', {mercury});
});

app.get('/venus', (req, res) => {
    let venus = planets.getVenus();
    res.render('venus.ejs', {venus});
});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    // console.log(planetInfo);
    let planetInfo = planets[`get${planet}`]();
    res.render('planet.ejs', {planetInfo, planet});
});

app.get('/planets', async(req, res) => {
    let url = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2026-03-11";
    let response = await fetch(url);
    let data = await response.json();
    let img = data.url;
    res.render('planets.ejs', {img});
})


app.listen(3000, () => {
    console.log('server started');
});