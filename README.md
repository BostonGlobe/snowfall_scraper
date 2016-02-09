# snowfall_scraper

## install

- `npm install`

## run

- `node index.js > snowfall_scraper.json`

## deploy

First, do a regular commit. Then tag a new commit with `prod`. This will tell Jenkins to fetch the tag. In other words:

```bash
git tag -a prod -f -m 'prod'
git push -f --tags
```
