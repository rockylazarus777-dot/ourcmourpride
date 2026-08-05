import fs from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery | Our CM Our Pride",
  description:
    "A premium event gallery showcasing key moments and milestones from the Our CM Our Pride movement.",
};

interface GalleryEventMeta {
  slug: string;
  title: string;
  folder: string;
}

const GALLERY_EVENTS: GalleryEventMeta[] = [
  {
    slug: "anbula-amma-viruthugal",
    title: "Anbula Amma Viruthugal",
    folder: "/gallery/anbula-amma-viruthugal",
  },
  {
    slug: "avadi-turns-pink",
    title: "Avadi Turns Pink",
    folder: "/gallery/avadi-turns-pink",
  },
  {
    slug: "cm-birthday-celebration-in-poonamallee",
    title: "CM Birthday Celebration in Poonamallee Constituency",
    folder: "/gallery/cm-birthday-celebration-in-poonamallee",
  },
  {
    slug: "our-cm-our-pride-launch",
    title: "Our CM Our Pride Launch",
    folder: "/gallery/our-cm-our-pride-launch",
  },
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const naturalSort = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }).compare;

function listEventImages(folder: string): string[] {
  const absDir = path.join(process.cwd(), "public", folder);
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(absDir);
  } catch {
    return [];
  }
  return entries
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort(naturalSort);
}

export default function GalleryPage() {
  const events = GALLERY_EVENTS.map((event) => {
    const files = listEventImages(event.folder);
    return {
      ...event,
      coverImage: files.length ? `${event.folder}/${encodeURIComponent(files[0])}` : null,
      photoCount: files.length,
    };
  });

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">
        <section className="section-padding pt-28 md:pt-32 lg:pt-36">
          <div className="container-max">
            <SectionHeading
              label="Event gallery"
              title="Moments that define our movement"
              description="Step inside our key events and see the energy, unity and pride of citizens coming together for a stronger Tamil Nadu."
              align="center"
            />

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={`/gallery/${event.slug}`}
                  className="group block overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <Camera size={28} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-poppins font-bold text-lg text-navy leading-snug transition-colors duration-200 group-hover:text-primary">
                      {event.title}
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <Camera size={13} className="text-primary" />
                      {event.photoCount} {event.photoCount === 1 ? "Photo" : "Photos"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
