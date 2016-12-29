# snowfall_scraper

## install

- `npm install`

## run

- `npm run prod` (this will write to `snowfall_scraper.json`).

## deploy

First, do a regular commit. Then tag a new commit with `prod`. This will tell Jenkins to fetch the tag. In other words:

```bash
git tag -a prod -f -m 'prod'
git push -f --tags
```
## reading
* http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2920858/
* http://lin-ear-th-inking.blogspot.com/2012/02/barnes-analysis-for-surface.html
* http://www.nytimes.com/interactive/2016/01/22/us/east-coast-snow-storm.html
* https://books.google.com/books?id=zzCiSJoohuQC&pg=PA397&lpg=PA397&dq=kernel+density+estimation+temperatures&source=bl&ots=hwJDL7Rcf1&sig=gerJFFJtsRSNXFq6eETpj3BC7fo&hl=en&sa=X&ved=0ahUKEwiF7tC--urKAhVGgYMKHRCfDbAQ6AEINzAD#v=onepage&q=kernel%20density%20estimation%20temperatures&f=false
* https://books.google.com/books?id=yZafBAAAQBAJ&pg=PT475&lpg=PT475&dq=scipy+kernel+density+latitude&source=bl&ots=vVm5VLISQ2&sig=4vF1TgISceIarEOsCKO31WTbidw&hl=en&sa=X&ved=0ahUKEwiJy_GX_erKAhWmuIMKHTPUBQUQ6AEIMjAD#v=onepage&q=scipy%20kernel%20density%20latitude&f=false
* https://gist.github.com/endolith/1035069
* http://scikit-learn.org/stable/auto_examples/neighbors/plot_species_kde.html