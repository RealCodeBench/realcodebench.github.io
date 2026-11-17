# RealCodeBench

Evaluating Coding Agents through Real-World Delivery.

Project website: https://realcodebench.github.io/

## Local preview

```sh
python3 -m http.server 4177
```

Open http://localhost:4177/. This is a buildless static website; all runtime assets use relative paths.

## GitHub Pages

Publish from the `main` branch, `/ (root)`, in Settings → Pages. `.nojekyll` disables Jekyll processing.

## Contents

- `index.html`, styles and JavaScript: bilingual project website.
- `assets/`: figures, branding and a 34-second introduction video.
- `assets/cases/`: four selected task examples, source excerpts and historical HTML previews.

The game footage replays a historical HTML snapshot. The fitness example is a static design mockup with sample values. Neither is a measured benchmark score or a claim of complete task acceptance. Paper, dataset and evaluation releases are forthcoming.

Authors: Mengjie Ren*, Guozhao Mo*, Xingyu Li, Jie Lou†. Xiaohongshu | dots studio. * Equal contribution. † Project lead.

## Credits

Page presentation references https://github.com/3DCodeFactory/3dcodefactory.github.io. The dots studio mark is used for the shared affiliation. Bundled Font Awesome assets retain their license notice in the CSS header; other third-party assets are used in the restored historical mockup.

## Scenario dimension explorer

The home page includes three interactive groups: engineering task (five parallel descriptors), user and interaction, and execution environment. Editorial role groupings, a language overview and a paraphrased conversation, and an environment schematic introduce the three groups. A collapsed source panel provides all values recorded in the 2026-10-20, 600-candidate annotation snapshot. The downloadable `assets/dimension-values.json` contains display labels and source digest only. Free-text user fields use a clearly labeled C0587 example. Snapshot label counts are not final benchmark size or verified acceptance coverage.

## Citation

The bilingual citation section supports copying BibTeX and downloading `assets/realcodebench.bib`. It cites the project website, with the confirmed author order, rather than an unreleased paper.

## Page structure

The page follows five stages: project identity and short motivation, real task examples, benchmark composition, evaluation perspectives, and citation. Cases use thumbnail switching with one large visual and the full request timeline. Detailed provenance stays in a single disclosure; visual-source labels remain visible. Scenario definitions and recorded values share one three-tab component, with the full research diagram in a disclosure. Evaluation is presented as three horizontal rows.

Static asset URLs include content versions. Refresh the version strings in `index.html` when changing JavaScript or CSS so browsers load the matching release.
