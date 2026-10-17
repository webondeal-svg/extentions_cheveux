# Maquette The Glam Room

Maquette navigable du site de The Glam Room (extensions de cils et de cheveux, Levallois-Perret).
Version de travail, non indexée (`noindex`), à ne pas publier telle quelle.

## Voir la maquette

Ouvrir `index.html` dans un navigateur. Les pastilles orangées signalent ce qui reste à confirmer ;
le bouton « Masquer les repères », en haut de page, les retire pour voir le rendu final.

## Modifier

Les pages `.html` de ce dossier sont générées : on modifie `_source/`, puis on régénère.

- `_source/site.json` : liens de réservation, WhatsApp, téléphone, avis (un seul endroit), titres et descriptions des pages.
- `_source/pages/` : le contenu de chaque page.
- `_source/partials/` : en-tête, pied de page, choix de réservation, barres mobiles, bloc d'avis.
- `assets/css/site.css`, `assets/js/site.js` : styles et comportements (le site fonctionne sans JavaScript).

Régénérer et contrôler, avec les outils du Skill Maquette (dépôt `webondeal`, `.claude/skills/maquette/outils/`) :

```bash
# depuis la racine de webondeal-site, OUTILS = chemin vers .claude/skills/maquette/outils
python3 $OUTILS/build.py maquettes/the-glam-room
node $OUTILS/controle.mjs maquettes/the-glam-room /tmp/controle
```

## Sources

- Textes : `clients/the-glam-room/textes-site.md` (base de travail validée par Imen le 17/10/2026), dans les fichiers du projet.
- Contenu : `brief.md` validé le 15/10/2026 ; architecture validée le 15/10/2026.
- Direction artistique : projection PDF d'Agnès (Drive, « 3. Créations ») ; base technique : dépôt `extentions_cheveux`.
- Photos : cils et espace de soin fournis par Agnès ; cheveux = photos d'illustration légendées, en attendant ses réalisations.

## Avant la mise en ligne

Tout ce qui est marqué d'une pastille doit être confirmé ou remplacé, notamment :
les prix des cils (Treatwell ou sa grille), les photos de cheveux réelles et un portrait d'Agnès,
la formulation de l'acompte, les mentions légales, les trois avis Treatwell à recopier mot pour mot.
Puis retirer `noindex`, le bandeau « Maquette » et les repères, et publier (Cloudflare Pages ou WordPress).
