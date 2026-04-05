export type FloorKey = "default_flat" | "concrete" | "checker_black" | "checker_beige" | "vinyl_wood" | "carpet"
export type Size = "S" | "M" | "L" | "XL"

export const FLOOR_OPTIONS: { key: FloorKey; label: string }[] = [
  { key: "default_flat", label: "Default Flat" },
  { key: "concrete", label: "Grey Concrete" },
  { key: "checker_black", label: "B&W Checkerboard" },
  { key: "checker_beige", label: "Beige Checkerboard" },
  { key: "vinyl_wood", label: "Grey Vinyl Wood" },
  { key: "carpet", label: "Home Carpet" },
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
  default_flat: `Create an ultra-realistic amateur-style product photo of a single clothing item laid flat naturally on a tiled floor.

The floor must look 100% real, like a normal apartment floor — light beige or neutral ceramic tiles, slightly matte finish, with thin grout lines and soft daylight reflection. The carrelage should feel authentic and lived-in, not studio-perfect.

The photo must look like it was taken casually at home with an iPhone 15 Pro, under natural daylight from a nearby window (soft side lighting, gentle shadows, no harsh contrast).

The garment should lie flat but not perfectly symmetrical, with light wrinkles and texture visible to show the fabric's real feel.

FRAMING RULE: The ENTIRE garment must be fully visible in the frame with generous margin on all sides. Zoom out enough so no part of the clothing is cropped or cut off. The image must be square (1:1 aspect ratio).

Camera angle: slightly above the ground (not perfectly top-down), as if someone leaned over to take the picture by hand.

Lens style: realistic iPhone perspective (wide but natural), with good sharpness and balanced exposure.

No walls, no background props, no editing filters — only the clothing item and the tiled floor.

Ensure realistic color tones, natural shadows, and authentic lighting like a genuine amateur photo taken in a home environment. No direct sunlight, only soft ambient daylight. Preserve exact colors, graphics, logos and texture of the clothing — only change the surface and lighting.`,

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

const backSideRule = `
BACK SIDE RULE: This image shows the BACK side of the garment. You MUST preserve this exact orientation — do NOT flip, mirror, or rotate the garment. The back of the clothing (with its seams, tags, back print, or plain fabric) must remain facing the camera exactly as provided. Do NOT show the front side.`

export function buildFloorPrompt(floor: FloorKey, mainArticle?: string, isBack?: boolean): string {
  let prompt = `${FLOOR_BASE[floor]}\n${isolationRule(mainArticle)}`
  if (isBack) prompt += `\n${backSideRule}`
  return prompt
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

Marque : [INVENTE un nom de marque fictif UNIQUE et ORIGINAL en 1 ou 2 mots, adapté au style du vêtement (chic, casual, sport, vintage, streetwear, etc.). Ne réutilise JAMAIS les mêmes noms. Inspire-toi de sonorités variées : japonais (ex: Kōzō, Mugen), urbain (ex: Bloc97, Rawside), nordique (ex: Frøst, Vild), français (ex: Pavé, Brûlé), italien (ex: Vesto, Lume), futuriste (ex: Nøva, Xylo). Chaque fiche doit avoir un nom complètement différent. Toujours sur cette ligne avec le label "Marque :"]

RÈGLES ABSOLUES :
- La taille est ${size}. Tu DOIS écrire "Taille ${size}" exactement, sans jamais changer la lettre.
- Exactement 80 hashtags, compte-les avant de répondre.
- La ligne "Marque : [nom]" est OBLIGATOIRE à la fin, toujours.
- Aucun titre de section (pas de "TITRE", "DESCRIPTION", "HASHTAGS", etc.)
- Réponds uniquement avec la fiche finale.`
