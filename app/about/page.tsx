import Image from "next/image";
import { generateMetadata } from "@/lib/helpers";
import { playfairFont } from "@/lib/utils";

export const metadata = generateMetadata({
  title: "About Us - Glow and Gather",
  description: "Discover the story behind Glow and Gather, where passion meets craftsmanship in every handcrafted candle, room spray, and wax melt we create. Learn about our commitment to quality and sustainability.",
  path: "/about",
  keywords: ["about glow and gather", "handcrafted candles story", "sustainable candles", "artisan candle makers", "eco-friendly products"],
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 bg-linear-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
            style={playfairFont}
          >
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Discover the story behind Glow and Gather, where passion meets craftsmanship
            in every handcrafted candle, room spray, and wax melt we create.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/candle1.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2
                className="text-4xl font-bold text-foreground mb-6"
                style={playfairFont}
              >
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Founded with a passion for creating moments of warmth and ambiance,
                Glow and Gather began as a small home-based operation dedicated to
                crafting premium, handmade candles.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Every product we create is made with love, using only the finest
                natural ingredients. We believe that the right scent can transform
                a space and create lasting memories.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we've expanded our collection to include room sprays and wax
                melts, but our commitment to quality and sustainability remains
                unchanged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-center text-foreground mb-12"
            style={playfairFont}
          >
            Our <span className="text-primary">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={playfairFont}
              >
                Quality First
              </h3>
              <p className="text-muted-foreground">
                We use only premium, natural ingredients to ensure the highest
                quality in every product.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={playfairFont}
              >
                Sustainability
              </h3>
              <p className="text-muted-foreground">
                Eco-friendly practices and recyclable packaging for a better
                tomorrow.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={playfairFont}
              >
                Handcrafted with Love
              </h3>
              <p className="text-muted-foreground">
                Every product is carefully handcrafted with attention to detail
                and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-bold text-foreground mb-6"
            style={playfairFont}
          >
            Ready to Experience the <span className="text-primary">Difference</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our collection and discover the perfect scent for your space.
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-all duration-300"
            style={playfairFont}
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;