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
## reading
* http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2920858/
* http://lin-ear-th-inking.blogspot.com/2012/02/barnes-analysis-for-surface.html