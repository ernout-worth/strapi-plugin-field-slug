# Strapi plugin: slug
---
This plugin adds a Slug field to Strapi.
Slug has autocomplete default generated value in format: post-year-month-day-hours-minutes-seconds, same for all locales.

Also we can add KeyWord and/or pattern, which will be used to generate slug.

There are next patterns:

- keyword
- title + keyword
- id + keyword
- datetime + keyword
- title
- id
- datetime 

Id generated automatically after clicking on button Save. If you don't choose any KeyWord or Pattern it's autofill field with datetime placeholder.

## Instalation
Install the plugin in your Strapi project.
- npm i custom-slug | [npm](https://www.npmjs.com/package/custom-slug)
- npm run build > npm run develop
- go to admin > Content Type Builder > choose content type > click to button Add another field (to this collection type) > select tab CUSTOM > click on slug plugin tile > add name to field label > click on button finish > click on button save.
- go to tab Advanced settings and check it off Enable localization for this field to FALSE (if it is TRUE/checked plugin generate unique value for every entry for all locales)

[content-type-builder](http://localhost:1337/admin/plugins/content-type-builder/content-types/)


## Description
This is Slug Custom Field plugin which generate automatically rewritable values on entity creation, like: post-year-month-day-hours-minutes-seconds and saves the same value for all locales in slug.
      
- autocomplete autofill uniq default value by title, entry id, current datetime and/or key word 
- same slug value to all locales 
- rewritable data 
- pattern by placeholder
