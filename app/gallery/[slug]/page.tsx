import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

/**
 * Filenames are hardcoded (not read via fs at request/build time) on purpose:
 * a dynamic `fs.readdirSync(publicPath)` call can't be resolved by Vercel's
 * static file tracer, which then conservatively bundles the entire scanned
 * directory into the serverless function. These folders hold ~250MB of
 * photos, which blew the 250MB function size limit. Static arrays keep the
 * images as plain public/ assets (served by the CDN) and out of the
 * function bundle entirely. Keep this list in sync with app/gallery/page.tsx
 * and update it if photos are added/removed.
 */
interface GalleryEvent {
  slug: string;
  title: string;
  folder: string;
  files: string[];
}

const GALLERY_EVENTS: GalleryEvent[] = [
  {
    slug: "anbula-amma-viruthugal",
    title: "Anbula Amma Viruthugal",
    folder: "/gallery/anbula-amma-viruthugal",
    files: [
      "265916d3-4318-402b-9cc5-0fc2e91f4fe3.jpeg",
      "2cb098f6-2a60-4aec-9567-e3a70a1970ea.jpeg",
      "3cfd376a-3e86-4671-8f5c-9aaf8b9881eb.jpeg",
      "486444b9-33b1-4eba-b585-2850e5297131.jpeg",
      "66efe384-a47b-4c5a-b9e5-469158fb4b43.jpeg",
      "7cf19ecf-e145-477d-8505-d6b5a4ac5770.jpeg",
      "ebe3c990-36aa-4115-81b9-baf7fac2eed0.jpeg",
    ],
  },
  {
    slug: "avadi-turns-pink",
    title: "Avadi Turns Pink",
    folder: "/gallery/avadi-turns-pink",
    files: [
      "0a306826-0827-42c4-b062-75335ccb37c1.jpeg",
      "0dc62ebc-a1c5-41d8-9238-51a9be8e7bff.jpeg",
      "3579fb77-5c50-4af1-88d4-388f5165a186.jpeg",
      "5bdd0244-a4fe-462c-8f19-47dbdbd20fb9.jpeg",
      "71d5b159-86a0-40c5-89ac-93b0e3df687d.jpeg",
      "838cc33e-05e8-4e2e-8824-90f7853b52c5.jpeg",
      "e7c2b292-0fce-4186-8036-e9478374e39a.jpeg",
    ],
  },
  {
    slug: "cm-birthday-celebration-in-poonamallee",
    title: "CM Birthday Celebration in Poonamallee Constituency",
    folder: "/gallery/cm-birthday-celebration-in-poonamallee",
    files: [
      "183aeab2-6fd7-4002-a89f-89e618d7a017.jpeg",
      "1fffe394-0788-4e53-83ae-15915c0695f5.jpeg",
      "2df8ce68-f86f-4034-baf0-d4d8f466f862.jpeg",
      "4eb0c59c-d723-4d72-8890-397a6993b7f6.jpeg",
      "61a604e8-e3c4-4d3d-8b08-a34069aabba1.jpeg",
      "88519472-b226-4e12-b42f-c2d0ee2e6b2e.jpeg",
      "8fab8635-42a3-4d26-a0ff-8040d74b04c8.jpeg",
      "918e4942-1762-41b8-b069-31922b2a4390.jpeg",
    ],
  },
  {
    slug: "our-cm-our-pride-launch",
    title: "Our CM Our Pride Launch",
    folder: "/gallery/our-cm-our-pride-launch",
    files: [
      "2V8A0110 (1).JPG",
      "2V8A0110.JPG",
      "2V8A0143.JPG",
      "2V8A0217.JPG",
      "2V8A0253.JPG",
      "2V8A0257.JPG",
      "2V8A0340.JPG",
      "2V8A0352.JPG",
      "2V8A0368.JPG",
      "2V8A0405.JPG",
      "2V8A0411.JPG",
      "2V8A0438.JPG",
      "2V8A0464.JPG",
      "2V8A0493.JPG",
      "2V8A0542.JPG",
      "2V8A0557.JPG",
      "2V8A0614.JPG",
      "2V8A0637.JPG",
      "2V8A0643.JPG",
      "2V8A0649.JPG",
      "2V8A0658.JPG",
      "2V8A0665.JPG",
      "2V8A0670.JPG",
      "2V8A0695.JPG",
      "2V8A0714.JPG",
      "2V8A0762.JPG",
    ],
  },
];

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

  const photoCount = event.files.length;

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

  const images = event.files.map((filename, index) => ({
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
