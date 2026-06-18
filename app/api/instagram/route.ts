import { NextResponse } from "next/server";

export async function GET() {
  const posts = [
    {
      img: "/assets/projects/photos_set1/image_2.webp",
      caption: "A sleek beige organic sofa matches standard-setting minimal plaster walls. Elevating curated interior installations with custom textiles and low-pressure inflatable elements. Madrid — Mumbai.",
      likes: "1,824",
      comments: "84",
    },
    {
      img: "/assets/projects/photos_set1/image_3.webp",
      caption: "Tactile studies in linen. Blending organic soft pillows and pillow-shaped cushion installations into peaceful structural concepts. Habitats made to dream. #DecorLab",
      likes: "2,412",
      comments: "126",
    },
    {
      img: "/assets/projects/photos_set1/image_4.webp",
      caption: "Sculptured circular lines and stark concrete detail studies. Curated pampas accents contrast beautifully with organic white dining modules. Clean living aesthetics.",
      likes: "1,538",
      comments: "42",
    },
    {
      img: "/assets/projects/photos_set2/image_2.webp",
      caption: "Plaster ceilings, low oak platform beds, and pristine linen sheets catch the morning sunbeams. A cozy, high-end design study celebrating Mediterranean roots.",
      likes: "3,104",
      comments: "194",
    },
    {
      img: "/assets/projects/photos_set2/image_3.webp",
      caption: "Modern art installation featuring white geometric spheres and abstract minimalist shapes under clean gallery spotlighting. Sensory scale transitions.",
      likes: "1,209",
      comments: "38",
    },
    {
      img: "/assets/projects/photos_set2/image_4.webp",
      caption: "Concrete study and dry decorative accents in our design lab. Moods of shadow and light reflecting the future of premium interior architectures.",
      likes: "2,945",
      comments: "107",
    },
    {
      img: "/assets/projects/photos_set1/image_1.webp",
      caption: "Curating space, light, and shadow. A clean study in minimalist lines, organic textures, and functional elegance. Every detail designed with purpose.",
      likes: "2,120",
      comments: "76",
    },
    {
      img: "/assets/projects/photos_set1/image_5.webp",
      caption: "Serene corners. Warm neutral tones, textured plaster, and hand-selected natural accessories creating a quiet space for mindfulness and rest.",
      likes: "1,980",
      comments: "62",
    },
    {
      img: "/assets/projects/photos_set1/image_6.webp",
      caption: "Bespoke furniture studies. Seamless solid oak transitions matching low-profile linen seating. Tailored geometry for contemporary living.",
      likes: "2,750",
      comments: "112",
    },
    {
      img: "/assets/projects/photos_set2/image_1.webp",
      caption: "Exploring materiality. Raw limestone blocks meeting delicate linen weaves. A tactile harmony that speaks of silent luxury and permanence.",
      likes: "2,430",
      comments: "95",
    },
    {
      img: "/assets/projects/photos_set2/image_5.webp",
      caption: "Ambient illumination studies. Soft, indirect light reflecting off curvilinear walls to sculpt space and create a welcoming, soft-spoken atmosphere.",
      likes: "1,690",
      comments: "48",
    },
    {
      img: "/assets/projects/photos_set2/image_6.webp",
      caption: "Architectural silhouettes. Bold geometric forms finding balance in textured cream plaster. Crafting modern design narratives in everyday spaces.",
      likes: "2,820",
      comments: "134",
    },
  ];

  return NextResponse.json({ success: true, posts });
}
