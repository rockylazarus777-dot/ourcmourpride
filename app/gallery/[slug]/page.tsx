import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GALLERY_EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = GALLERY_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    return { title: "Event Not Found | Our CM Our Pride" };
  }

  const photoCount = listEventImages(event.folder).length;

  return {
    title: `${event.title} | Gallery | Our CM Our Pride`,
    description: `Browse ${photoCount} photos from ${event.title}.`,
  };
}

export default async function EventGalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const event = GALLERY_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const files = listEventImages(event.folder);
  const images = files.map((filename, index) => ({
    src: `${event.folder}/${encodeURIComponent(filename)}`,
    alt: `${event.title} — photo ${index + 1}`,
  }));

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">
        <section className="section-padding pt-28 md:pt-32 lg:pt-36">
          <div className="container-max">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-orange-600"
            >
              <ArrowLeft size={14} />
              Back to Gallery
            </Link>

            <div className="mt-6 max-w-3xl">
              <h1 className="font-poppins font-black text-3xl leading-tight text-navy md:text-4xl lg:text-5xl">
                {event.title}
              </h1>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Camera size={16} className="text-primary" />
                {images.length} {images.length === 1 ? "Photo" : "Photos"}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 section-padding pt-0">
          <div className="container-max">
            {images.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                  <a
                    key={image.src}
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-[20px] bg-slate-100 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-[20px] border border-dashed border-slate-300 bg-white py-24 text-center">
                <Camera size={32} className="mx-auto mb-4 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500">
                  Photos from this event are coming soon.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
