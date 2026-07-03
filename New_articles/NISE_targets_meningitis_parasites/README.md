# NISE targets meningitis parasites

Public Databiomics research resource for **Non-homologous isofunctional enzyme candidates in neurologically relevant helminths**.

## Description

This module publishes an AnEnPi-derived comparative enzymology resource for prioritizing non-homologous isofunctional enzyme candidates in neurologically relevant helminths. The static page exposes the article files, curated tables, FASTA sequences, figures, supplementary files, scripts, SQLite database placeholder and Streamlit app entry point.

## Binary asset handling

PDF, DOCX, XLSX, SQLite and ZIP paths are kept as Git LFS pointer placeholders in this branch to avoid GitHub pull request binary-preview errors. Before production publication, replace the pointer placeholders with the final files through Git LFS while preserving the same relative filenames used by `index.html` and `articles.json`.

## How to update tables

1. Export reviewed tables as CSV into `tables/`.
2. Export the workbook as `tables/NISE_targets_tables.xlsx`.
3. Update the table tabs in `index.html` or regenerate the page with `scripts/rebuild_static.py`.
4. Keep links relative to this directory.

## How to add FASTA

1. Add `.fasta` or `.fa` files to `fasta/`.
2. Add a link for each file in the FASTA downloads section of `index.html`.
3. Include the FASTA files in the supplementary ZIP package when relevant.

## How to update articles.json

Edit `../articles.json` and update the object whose `slug` is `NISE_targets_meningitis_parasites`. Keep `project_url`, `article_pdf`, `tables_url` and `fasta_url` as site-relative URLs.

## How to run the Streamlit application

```bash
cd New_articles/NISE_targets_meningitis_parasites/streamlit_app
streamlit run app.py
```

## How to recreate the SQLite database

Place database build scripts in `scripts/`, write the output to `database/nise_targets.sqlite`, and document the required source table versions in `supplementary/NISE_targets_package_manifest.txt`.

## How to regenerate the static page

```bash
cd New_articles/NISE_targets_meningitis_parasites
python3 scripts/rebuild_static.py
```

Review `index.html` after regeneration to ensure the article, tables, FASTA, figures, supplementary files, database links and contact form are still available.

## How to cite

If you use these data, please cite the associated article:

Pereira LM, Graeff-Teixeira C, Morassutti AL. *Non-homologous isofunctional enzyme candidates in neurologically relevant helminths*. Databiomics resource, updated 2026-07-03.

## Contact

- info@databiomics.com
- mattosmp@gmail.com
- almorassutti@gmail.com
