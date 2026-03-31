export type FloorKey = "concrete" | "checker_black" | "checker_beige" | "vinyl_wood" | "carpet"
export type Size = "S" | "M" | "L" | "XL"

export const FLOOR_OPTIONS: { key: FloorKey; label: string }[] = [
  { key: "concrete", label: "Béton gris" },
  { key: "checker_black", label: "Damier noir & blanc" },
  { key: "checker_beige", label: "Damier beige" },
  { key: "vinyl_wood", label: "Bois gris vinyl" },
  { key: "carpet", label: "Tapis maison" },
]

const isolationRule = (mainArticle?: string) =>
  mainArticle?.trim()
    ? `ISOLATION RULE: This photo may show a full outfit on a mannequin or multiple items together. Extract and place on the surface ONLY the single garment described as: "${mainArticle}". Remove ALL other garments, accessories, shoes, jewelry, gloves, collars and any other objects completely. Only "${mainArticle}" should appear in the result.`
    : `ISOLATION RULE: This photo may show a full outfit on a mannequin or multiple items together. Identify and place on the surface ONLY the single most prominent clothing garment (the main article being sold). Remove all secondary garments, accessories, shoes, jewelry, and other objects completely. Only one single garment in the result.`

const BASE_STYLE = `
- Camera angle slightly overhead (45-60 degrees), not fully top-down
- Strong natural outdoor daylight casting sharp directional shadows across the surface
- Clothes arranged naturally and relaxed, not perfectly folded
- Slightly desaturated color grading, cool-neutral tones
- No props, no people, no text, no logos added
- Secondhand streetwear fashion photography style
- Ultra sharp image, 4K quality, high resolution
- Preserve exact colors, graphics, logos and texture of the clothing. Only change surface and lighting.
CRITICAL — ITEMS RULE: Include ONLY the exact clothing item(s) already visible in the original photo. Do NOT add any accessories, shoes, bags, jewelry, belts, hats, socks, glasses or any other item that is not physically present in the original image. If the original shows one garment, output exactly one garment. Never invent or add objects.
`

export const FLOOR_BASE: Record<FloorKey, string> = {
  concrete: `Take the clothing item(s) in this image and place them in a product photography scene:
- Garments laid casually on a medium grey concrete floor
- Surface: uniform smooth concrete, consistent medium grey tone across the entire frame, same grain density everywhere, no lighter or darker patches, no color variation whatsoever
${BASE_STYLE}`,

  checker_black: `Take the clothing item(s) in this image and place them in a product photography scene:
- Garments laid casually on a black and white checkerboard tile floor
- Surface: perfectly uniform checkerboard pattern, each square exactly 15cm, crisp black (#1a1a1a) and pure white (#f5f5f5), perfectly aligned 90-degree grid, no perspective distortion, same square size across the entire frame, matte ceramic finish
${BASE_STYLE}`,

  checker_beige: `Take the clothing item(s) in this image and place them in a product photography scene:
- Garments laid casually on a beige checkerboard tile floor
- Surface: perfectly uniform checkerboard pattern, each square exactly 15cm, alternating warm beige (#c8b89a) and off-white (#f0ebe3), matte ceramic finish, perfectly aligned grid, consistent color and size across the entire frame, no variation
${BASE_STYLE}`,

  vinyl_wood: `Take the clothing item(s) in this image and place them in a product photography scene:
- Garments laid casually on a grey vinyl wood-effect floor
- Surface: uniform planks all running in the same horizontal direction, consistent ash-grey tone (#9ba5a8) throughout every plank, no color variation between planks, matte finish, subtle realistic wood grain texture, no visible joints variation
${BASE_STYLE}`,

  carpet: `Take the clothing item(s) in this image and place them in a product photography scene:
- Garments laid casually on a light grey home carpet
- Surface: uniform short-pile carpet, consistent flat light grey (#d0cfce) across the entire surface, no pattern, uniform pile height throughout, soft matte appearance, no texture variation
- Soft warm indoor natural light, gentle soft shadows
- Clothes arranged naturally and relaxed, not perfectly folded
- Slightly desaturated color grading, warm-neutral tones
- No props, no people, no text
- Secondhand streetwear fashion photography style
- Ultra sharp image, 4K quality, high resolution
- Preserve exact colors, graphics, logos and texture of the clothing. Only change surface and lighting.`,
}

/** Kept for backward compat — use buildFloorPrompt() for new calls */
export const FLOOR_PROMPTS: Record<FloorKey, string> = FLOOR_BASE

export function buildFloorPrompt(floor: FloorKey, mainArticle?: string): string {
  return `${FLOOR_BASE[floor]}\n${isolationRule(mainArticle)}`
}

export const DESC_PROMPT = (size: Size) => `Tu es mon assistant pour créer des fiches Vinted. Suis EXACTEMENT ce format, sans aucune variation, sans titres de section, sans emojis, directement le contenu brut :

[LIGNE 1] Titre SEO : Nom du vêtement + couleur + 4 à 6 mots-clés séparés par " / "
Exemple : Hoodie gris oversize / streetwear / unisexe / casual / tendance 2024

[LIGNE VIDE]

[LIGNE 2] Taille ${size}
[LIGNE 3] Une phrase courte sur la coupe ou le style.
[LIGNE 4] Très bon état, porté quelques fois.
[LIGNE 5] (optionnel) Un petit détail utile si pertinent.

[LIGNE VIDE]

Mensurations taille ${size} :
Invente des mensurations réalistes selon le type de vêtement. Pas de "environ" ni "~".
Hauts → Longueur : XXcm / Poitrine : XXcm / Épaules : XXcm / Manches : XXcm
Bas → Tour de taille : XXcm / Hanches : XXcm / Longueur : XXcm

[LIGNE VIDE]

Compte EXACTEMENT 80 hashtags, tous sur une seule ligne, séparés par des espaces, en FR + EN + ES + DE + IT. Aucun hashtag de marque réelle. Exactement 80, ni plus ni moins.

[LIGNE VIDE]

Marque : [INVENTE un nom de marque streetwear fictif en 1 ou 2 mots, toujours présent, toujours sur cette ligne avec le label "Marque :"]

RÈGLES ABSOLUES :
- La taille est ${size}. Tu DOIS écrire "Taille ${size}" exactement, sans jamais changer la lettre.
- Exactement 80 hashtags, compte-les avant de répondre.
- La ligne "Marque : [nom]" est OBLIGATOIRE à la fin, toujours.
- Aucun titre de section (pas de "TITRE", "DESCRIPTION", "HASHTAGS", etc.)
- Réponds uniquement avec la fiche finale.`
