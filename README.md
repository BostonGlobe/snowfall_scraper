# snowfall_scraper

## install

- `npm install`

## run

- `node index.js > snowfall_scraper.json`

## deploy

First, do a regular commit. Then tag a new commit with `prod`. This will tell Jenkins to fetch the tag. In other words:

```bash
git tag -a prod -f
git push -f --tags
```

## possible sources
http://www.nws.noaa.gov/view/states.php