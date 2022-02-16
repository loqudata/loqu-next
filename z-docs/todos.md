# TODOs

## Meta

- [ ] better habit of writing conventional commits
- [ ] generate a changelog
- [ ] deploy more frequently, eg after 3 good changes (eg looking at prod loqu for example datasets shows extra vertical spacing for `Field`s and no tooltip on `Plot` hover)
- [ ] have github status show deploy info

## Chart editor

- [ ] Improve month/time https://loqudata.org/visualize?id=q6y2-66pb&portal=internal.chattadata.org
- [ ] Fix extents
- [ ] Make the none option only visible if something is selected (eg not placeholder)
- [x] Better visualize page with new fields, integrate chart editor into existing visualize page
- [x] Start working on large dataset using SQL/DuckDB, integrate chart editor into Workspace

## Recommendations

- [x] Move data into regular Redux so Vega/CompassQL can mutate - add Symbols to it, get CSQL working
- [ ] Make the main field name more prominent, probably not in a pill, or big and without pill, and get rid of large Fields heading


## Field View

Add little pill buttons to sort by type: nominal, quantitative, temporal, etc.

- [x] Implement the Show in/Add to Chart Editor


## Overall App

- [ ] Show errors loading data from Socrata web service
- [ ] test data for empty list/object, and show an error, and test if resource is simply a chart on another dataset? - https://loqudata.org/visualize?id=uz48-wg52&portal=data.pa.gov, https://data.pa.gov/resource/uz48-wg52.json?$select=*, https://data.pa.gov/Opioid-Related/Annual-Rate-of-Newly-Diagnosed-Cases-of-Hepatitis-/uz48-wg52
- [ ] test if it's resource is from internal Socrata instance and ignore - https://loqudata.org/visualize?id=hc2p-bbis&portal=covid19response.buffalony.gov, https://covid19response.buffalony.gov/d/hc2p-bbis
- [ ] improve Data Loader - rename table associated with file (maybe just create a view, but then needs to use real table name for any edit operations - explain limitation on SQL page)
- [ ] Allow user to view fields, recommendations, and chart editor for different datasets. Open multiple of same type for diff DS? How important is this?
- [ ] Some visual join editor to show two input tables and output, then use the output as visualization
- [ ] At least, show the fields/recommendations for SQL output so can visualize joined data

don't worry about scalability right now, pushing down Vega aggregations or Compassql statistics. Focus on join features.