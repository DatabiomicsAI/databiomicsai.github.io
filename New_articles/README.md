# Databiomics New_articles catalog

`New_articles/` is the publication-facing catalog for Databiomics scientific
resources. Existing projects are preserved and new resources are merged by
their stable `slug`.

## Structure

```text
New_articles/
├── index.html
├── articles.json
├── assets/
│   ├── catalog.css
│   └── catalog.js
└── <resource-slug>/
    ├── index.html
    ├── figures/
    ├── downloads/
    ├── data/
    └── metadata/
```

## Automated RSES-Onco atlas publication

The RSES-Onco Family-Aware repository builds and publishes its validated atlas
with:

```bash
bash run_all_analyses.sh \
  --skip-analysis \
  --skip-external-preparation \
  --diagnostic \
  --publish-atlas
```

The publisher replaces only the selected resource directory, merges one record
into `articles.json`, preserves all other resources, checks file sizes and
potential secrets, and records the site commit in a local publication receipt.

## `articles.json` minimum schema

Each record must include `title`, `slug`, `authors`, `status`, `summary`,
`tags`, `project_url`, `repository_url` and `updated_at`. Optional fields
include `featured`, `resource_type`, `release`, `journal_target`,
`figures_url`, `tables_url` and `article_pdf`.

## Interpretation

Pages in this catalog are scientific resources. Computational rankings and
candidate lists do not constitute clinical recommendations, validated drug
targets or evidence of treatment benefit.
