import { Link, Navigate } from "react-router-dom";
import { MapPin, ArrowRight, Sparkles, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg font-semibold text-foreground">NamePlace</span>
          </div>
          <Link to="/auth">
            <Button size="sm" variant="outline" className="rounded-full px-5">Sign in</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" />
            Remember every connection
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            Never forget<br />
            <span className="text-primary">a name again</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            Pin the people you meet to the places you meet them. The barista, the mechanic, the neighbor — everyone has a place.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            <Link to="/auth">
              <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-border/50 bg-secondary/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Drop pins on any map location</div>
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-accent" /> Tag & organize your contacts</div>
            <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> Private & encrypted</div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Your world, organized
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
            Every person has a place in your life. NamePlace helps you remember where.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "☕", title: "The coffee shop regular", desc: "Remember Alex who draws hearts in your latte — greet them by name next visit." },
              { emoji: "🤝", title: "The networking contact", desc: "Tag conference contacts with the venue. Follow-ups become personal." },
              { emoji: "🏠", title: "The neighborhood friend", desc: "From dog walkers to the friendly baker — never blank on a name again." },
            ].map((card) => (
              <div key={card.title} className="group bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-5">{card.emoji}</div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Start remembering
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Free to use. Just sign in with Google and start pinning the people in your world.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-base hover:-translate-y-0.5 transition-all duration-300">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-serif text-sm text-muted-foreground">NamePlace</span>
          </div>
          <p className="text-xs text-muted-foreground">Remember everyone, everywhere.</p>
          <a href="https://www.linkedin.com/in/aohana/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Feedback? Let's connect →
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
